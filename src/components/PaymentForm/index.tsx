import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Session } from 'next-auth';
import { useRouter } from 'next/router';
import { ErrorOutline, ShoppingCart } from '@styled-icons/material-outlined';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { PaymentIntent, StripeCardElementChangeEvent } from '@stripe/stripe-js';
import Button from 'components/Button';
import Heading from 'components/Heading';
import { useCart } from 'hooks/use-cart';
import * as S from './styles';
import { createPayment, createPaymentIntent } from 'utils/stripe/methods';
import { FormLoading } from 'components/Form';

type PaymentFormProps = {
  session: Session;
};

const PaymentForm = ({ session }: PaymentFormProps) => {
  const { items } = useCart();
  const { push } = useRouter();

  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const [freeGames, setFreeGames] = useState(false);

  useEffect(() => {
    async function setPaymentMode() {
      if (items.length) {
        // bater na API /orders/create-payment-intent
        const data = await createPaymentIntent({
          items,
          token: session.jwt as string,
        });
        // enviar items do carrinho
        // se receber freeGames: true, setar setFreeGames(true)
        if (data.freeGames) {
          setFreeGames(true);

          return;
        }
        //fazer fluxo de jogo gratuito
        //se receber um erro, setar setError(error)
        if (data.error) {
          setError(data.error);
          return;
        }
        //senão o paymentIntent foi válido
        //setar setClientSecret
        setFreeGames(false);
        setClientSecret(data.client_secret);
      }
    }

    setPaymentMode();
  }, [items, session]);

  const handleChange = async (event: StripeCardElementChangeEvent) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : '');
  };

  const saveOrder = async (paymentIntent?: PaymentIntent) => {
    const data = await createPayment({
      items,
      paymentIntent,
      token: session.jwt as string,
    });

    return data;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    // se for freeGames
    // salva no banco
    // redireciona para success

    if (freeGames) {
      // salva no banco
      // redireciona para success
      saveOrder();
      push('/success');
      return;
    }

    const payload = await stripe!.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements!.getElement(CardElement)!,
      },
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setLoading(false);
    } else {
      setError(null);
      setLoading(false);

      // salvar a compra no banco do Strapi
      saveOrder(payload.paymentIntent);
      // redirectionar para a página de Sucesso
      push('/success');
    }
  };

  return (
    <S.Wrapper>
      <form onSubmit={handleSubmit}>
        <S.Body>
          <Heading color="black" lineBottom size="small">
            Payment
          </Heading>

          {freeGames ? (
            <S.FreeGames>Only free games, click buy and enjoy!</S.FreeGames>
          ) : (
            <CardElement
              options={{
                hidePostalCode: true,
                style: {
                  base: {
                    fontSize: '16px',
                  },
                },
              }}
              onChange={handleChange}
            />
          )}

          {error && (
            <S.Error>
              <ErrorOutline size={20} />
              {error}
            </S.Error>
          )}
        </S.Body>
        <S.Footer>
          <Link href="/" passHref>
            <Button as="a" fullWidth minimal>
              Continue shopping
            </Button>
          </Link>
          <Button
            fullWidth
            icon={loading ? <FormLoading /> : <ShoppingCart />}
            disabled={!freeGames && (disabled || !!error)}
          >
            {!loading && <span>Buy now</span>}
          </Button>
        </S.Footer>
      </form>
    </S.Wrapper>
  );
};

export default PaymentForm;
