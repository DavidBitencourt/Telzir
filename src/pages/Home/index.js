import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Typist from "react-typist";
import phone from "../../assets/images/phone.png";
import HeaderStyled from "../../components/Header";
import Loading from "../../components/Loading";
import {
  ActionBox,
  Container,
  ContentContainer,
  Image,
  ImageBox,
  Title,
} from "./styles";

function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, []);

  return (
    <>
      {loading && <Loading show={loading} />}
      <HeaderStyled />
      <Container>
        <ContentContainer>
          <ActionBox>
            {!loading && (
              <Typist cursor={{ element: "" }}>
                <Title>Seja bem vindo à Telzir!</Title>
                <Typist.Delay ms={500} />
                <Title>
                  Aqui o seu plano custa muito
                  <Typist.Backspace count={5} delay={200} />
                  pouco.
                </Title>
                <Typist.Delay ms={500} />
                <Title>Veja seu plano ideal!</Title>
              </Typist>
            )}
            <Link to="/calculate">Conferir</Link>
          </ActionBox>
          <ImageBox>
            <Image src={phone} />
          </ImageBox>
        </ContentContainer>
      </Container>
    </>
  );
}

export default Home;
