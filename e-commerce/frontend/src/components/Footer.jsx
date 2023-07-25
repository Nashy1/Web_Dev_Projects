import { Facebook, Instagram, MailOutline, Phone, Pinterest, Room, Twitter } from '@material-ui/icons';
import React from 'react'
import styled from 'styled-components'
import { mobile } from "../responsive"
import { Link } from '@material-ui/core';

const Container = styled.div`
    display: flex;
    ${mobile({ flexDirection: "column" })};
`;

const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
`;

const Logo = styled.h1`

`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${props => props.bg};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
    flex: 1; 
    padding: 20px;
    ${mobile({ display: "none" })};
`;

const Right = styled.div`
    flex: 1;  
    flex: 1; 
    padding: 20px;  
    ${mobile({ backgroundColor: "#fff8f8" })};
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
  width: 60%;
`;

const MyLink = styled.a`
  text-decoration: none;
  color: black;

  &:active { text-decoration: none; color:black; }
  &:focus { text-decoration: none; color:black; }
  &:hover { text-decoration: underline; color:black; }
  &:visited { text-decoration: none; color: black; }
`;

const Footer = () => {
    return (
        <Container>
            <Left>
                <Logo>MARK.</Logo>
                <Desc>
                    Discover a world of convenience and quality at your fingertips, with our wide range of products and reliable customer support.
                </Desc>
                <SocialContainer>
                    <Link href="https://www.facebook.com">
                        <SocialIcon bg="3B5999">
                            <Facebook />
                        </SocialIcon>
                    </Link>

                    <Link href="https://www.twitter.com">
                        <SocialIcon bg="E4405F">
                            <Twitter />
                        </SocialIcon>
                    </Link>

                    <Link href="https://www.instagram.com">
                        <SocialIcon bg="55ACEE">
                            <Instagram />
                        </SocialIcon>
                    </Link>

                    <Link href="https://www.pinterest.com">
                        <SocialIcon bg="E60023">
                            <Pinterest />
                        </SocialIcon>
                    </Link>

                </SocialContainer>
            </Left>
            <Center>
                <Title>Useful Links</Title>

                <List>
                    <ListItem><MyLink href="/" color="black">Home</MyLink></ListItem>
                    <ListItem><MyLink href="/products/men" color="black">Mens Fashion</MyLink></ListItem>
                    <ListItem><MyLink href="/products/women" color="black">Women Fashion</MyLink></ListItem>
                    <ListItem><MyLink href="/products/kids" color="black">Kids Fashion</MyLink></ListItem>
                    <ListItem><MyLink href="/account" color="black">My Account</MyLink></ListItem>
                    <ListItem><MyLink href="/account/orders" color="black">Order Tracking</MyLink></ListItem>
                    <ListItem><MyLink href="/cart" color="black">My Cart</MyLink></ListItem>
                    <ListItem><MyLink href="/terms" color="black">Terms and Conditions</MyLink></ListItem>
                </List>

            </Center>
            <Right>
                <Title>Contact</Title>
                <ContactItem>
                    <Room style={{ marginRight: "10px" }} /> 11 Karoo Drive, Eastern Cape
                </ContactItem>
                <ContactItem>
                    <Phone style={{ marginRight: "10px" }} /> +1 234 56 78
                </ContactItem>
                <ContactItem>
                    <MailOutline style={{ marginRight: "10px" }} /> mark1drinkwater@gmail.com
                </ContactItem>
                <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
            </Right>
        </Container >
    )
}

export default Footer;