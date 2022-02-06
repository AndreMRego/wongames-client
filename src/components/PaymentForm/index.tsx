import { useEffect, useState } from 'react';
import { Session } from 'next-auth';
import { ErrorOutline, ShoppingCart } from '@styled-icons/material-outlined';
import { CardElement } from '@stripe/react-stripe-js';
import { StripeCardElementChangeEvent } from '@stripe/stripe-js';
import Button from 'components/Button';
import Heading from 'components/Heading';
import { useCart } from 'hooks/use-cart';
import * as S from './styles';
import { createPaymentIntent } from 'utils/stripe/methods';

type PaymentFormProps = {
  session: Session;
};

const PaymentForm = ({ session }: PaymentFormProps) => {
  const { items } = useCart();
  const [error, setError] = useState<string | null>(null);
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
        setClientSecret(data.client_secret);
      }
    }

    setPaymentMode();
  }, [items, session]);

  const handleChange = async (event: StripeCardElementChangeEvent) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : '');
  };

  return (
    <S.Wrapper>
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
        <Button as="a" fullWidth minimal>
          Continue shopping
        </Button>
        <Button
          fullWidth
          icon={<ShoppingCart />}
          disabled={!freeGames && (disabled || !!error)}
        >
          Buy now
        </Button>
      </S.Footer>
    </S.Wrapper>
  );
};

export default PaymentForm;
