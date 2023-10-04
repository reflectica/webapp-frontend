import React from 'react';
import { Link } from "react-router-dom";
import styled, { createGlobalStyle } from 'styled-components';
import homeImage from "../images/Graphic-_1-removebg.png";
import aboutImage from "../images/aboutImage.jpeg";
import productImage from "../images/productImage.png";
//import headshot1 from "../images/headshot1.jpg";
import Icon1 from "../images/Icon1.png";
import Icon2 from "../images/Icon2.png";
import Icon3 from "../images/Icon3.png";
import Icon4 from "../images/Icon4.png";
//import Icon5 from "../images/Icon5.png";
//import Icon6 from "../images/Icon6.png";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Inter', sans-serif;
  }
`;

// Styling for the main header section

const OuterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 85%;
  width: 100%;
`;

const MainContainer = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 20px;
  padding-left: 7%;
`;

const SideContainer = styled.div`
  width: 30%;
  padding-right: 40%;
`;

const Image = styled.img`
  max-width: 27vw;
  max-height: 27vw; 
`;

const MainText = styled.h1`
  font-weight: bold;
  font-size: 4.5vw;
  text-align: left;
  line-height: 1.1;
  color: #494444;
  span {
    color: #5271FF;
  }
`;

const SubText = styled.p`
  font-size: 1.1vw;
  text-align: left;
  color: black;
  font-weight: semi-bold;
`;

const ButtonWrapper = styled.div`
  button {
    padding: 15px 40px;
    font-weight: 600;
    background-color: #5271FF;
    color: white;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    &:hover {
      color: #5271FF;
      background-color: white;
    }
  }
`;

// Styling for the about section

const AboutContainer = styled.div`
  display: flex;
  width: 100vw;
  margin-top: 50px; 
  justify-content: center; 
  align-items: center;
  background-color: white;
  height: fit-content;
`;

const ImageContainer = styled.div`
  flex: 35%;  
`;

const AboutImage = styled.img`
  max-width: 24vw;
  max-height: 24vw;   
  border-radius: 10px;
  margin-left: 220px;
`;

const TextContainer = styled.div`
  flex: 65%;  
  padding: 5.5em;
  display: flex;
  flex-direction: column;
`;

const AboutTitle = styled.h2`
  font-weight: bold;
  font-size: 2.5vw;
  margin-bottom: 15px;
  color: #5271FF;
`;

const AboutSubText = styled.p`
font-size: 1vw;
text-align: left;
color: black;
font-weight: semi-bold;
`;

// Styling for the state of mental health stats section

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 35px;
  padding: 2em 10em;
  height: fit-content;
`;

const StatsTextContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 0px;
`;

const StatsTitle = styled.h2`
  font-weight: bold;
  font-size: 2.5vw;
  color: #494444;
  span {
    color: #5271FF;
  }
`;

const StatsSubtitle = styled.p`
  font-size: 1.2vw;
  color: #18191F;
`;

const StatsGrid = styled.div`
  width: 50%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1em;
`;

const StatBox = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 1em;
`;

const IconImage = styled.img`
  align-self: flex-start;
  max-width: 2.5vw;
  max-height: 2.5vw;
`;

const StatMainText = styled.h3`
  font-weight: bold;
  margin-left: 10px;
  font-size: 1.8vw;
`;

const StatSubText = styled.p`
  margin-left: 10px;
  font-size: 1vw;
  color: grey;
`;

// Styling for the product section

const ProductContainer = styled.div`
  display: flex;
  width: 100vw;
  margin-top: 50px; 
  justify-content: center; 
  align-items: center;
  background-color: white;
  height: fit-content;
`;

const ProductImageContainer = styled.div`
  flex: 35%;  
  margin-right: 220px;
  margin-top: 20px;
`;

const ProductImage = styled.img`
  max-width: 27vw;
  max-height: 27vw;   
  border-radius: 0px;
  border: 3px solid #5271FF;
`;

const ProductTextContainer = styled.div`
  flex: 65%;  
  padding: 5.5em;
  display: flex;
  flex-direction: column;
  margin-left: 120px;
`;

const ProductTitle = styled.h2`
  font-weight: bold;
  font-size: 2.5vw;
  margin-bottom: 15px;
  color: #5271FF;
`;

const ProductSubText = styled.p`
  font-size: 1.2vw;
  text-align: left;
  color: black;
  font-weight: bold;
`;

// Styling for the pricing section 

/* const PricingTitle = styled.h2`
  font-weight: bold;
  font-size: 2.5vw;
  color: black;
  text-align: center;
  margin-top: 50px;
`;

const PricingSectionCards = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 50px auto;
`;

const PricingCard = styled.div`
  background-color: ${props => props.middle ? '#5271FF' : 'white'};
  width: 22%;
  padding: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  margin: 17px;
`;

const CardTitle = styled.h3`
  font-weight: bold;
  font-size: 2vw;
  color: ${props => props.middle ? 'white' : 'black'};
`;

const CardSubText = styled.p`
  font-size: 1vw;
  text-align: center;
  color: ${props => props.middle ? 'white' : 'grey'};
  margin: 15px 0;
`;

const DollarAmount = styled.span`
  font-size: 2.5vw;
  font-weight: bold;
  color: ${props => props.middle ? 'white' : '#5271FF'};
`;

const GreyBox = styled.div`
  background-color: #F5F7FA;
  padding: 20px;
  margin-top: 20px;
  border-radius: 5px;
  width: 95%;
`;

const BulletPoint = styled.p`
  font-size: 1vw;
  font-weight: regular;
  display: flex;
  align-items: center;
  color: black;
  img {
    margin-right: 10px;
    max-width: 1.2vw;
  }
`;

const PricingButton = styled.button`
  padding: 15px 60px;
  font-size: 1vw;
  font-weight: 600;
  background-color: white;
  color: #5271FF;
  border-radius: 10px;
  transition: background-color 0.3s ease;
  margin-top: 20px;
  &:hover {
    color: white;
    background-color: #5271FF;
  }
`;

// Styling for the testimonials section

const TestimonialsContainer = styled.div`
  background-color: white;
  padding: 50px 0;
`;

const TestimonialsTitle = styled.h2`
  font-weight: bold;
  font-size: 2.5vw;
  color: #5271FF;
  margin-bottom: 15px;
  text-align: left;
  padding-left: 7%;
`;

const TestimonialsSubText = styled.p`
  font-size: 1vw;
  text-align: left;
  color: black;
  font-weight: semi-bold;
  padding-left: 7%;
  margin-bottom: 30px;
`;

const TestimonialCardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 7%;
  padding-right: 7%;
`;

const TestimonialCard = styled.div`
  background-color: #F5F7FA;
  padding: 20px;
  border-radius: 10px;
  width: 30%;
  margin-right: 20px;
`;

const TestimonialHeadshotContainer = styled.div`
  position: relative;
`;

const TestimonialHeadshot = styled.img`
  max-width: 100%;
  border-radius: 50%;
  position: absolute;
  top: -20px;
  left: -20px;
  width: 60px;
  height: 60px; 
  border: 2px solid white;
`;

const TestimonialName = styled.h3`
  font-weight: bold;
  font-size: 1.5vw;
  color: #5271FF;
  margin-top: 15px;
`;

const TestimonialSubText = styled.p`
  font-size: 1vw;
  text-align: left;
  color: black;
  font-weight: semi-bold;
  margin-top: 10px;
`;

const TestimonialImage = styled.img`
  max-width: 100%;
  align-self: flex-end;
`;
*/
// Main global styling for the whole page

const divStyle = {
  backgroundColor: '#F5F7FA',
  height: '122em'
};

// Main JSX code

const Home = () => (
  <div className="flex h-screen w-screen flex-1 flex-col justify-center" style={divStyle} id="home">
    <GlobalStyle />

    {/*This is the main page that the user first sees*/}

    <OuterContainer>
      <MainContainer>
        <MainText>
          15-min audio therapy <br /> sessions with <span>AI</span>
        </MainText>
        <SubText>
          Conduct hyper-realistic life-like audio therapy sessions with an AI therapist.<br />Disclaimer: this is a self-reflection tool, not a substitute for professional help.
        </SubText>
        <Link to="/signup">
          <ButtonWrapper>
            <button type="button" className="rounded-md shadow-sm">Get Started</button>
          </ButtonWrapper>
        </Link>
      </MainContainer>
      <SideContainer>
        <Image src={homeImage} alt="Home Graphic" />
      </SideContainer>
    </OuterContainer>

    {/*This is the about section*/}

    <AboutContainer id="aboutUs">
      <ImageContainer>
        <AboutImage src={aboutImage} alt="About Us" />
      </ImageContainer>
      <TextContainer>
        <AboutTitle>About Us</AboutTitle>
        <AboutSubText>
        Our mission is grounded in the belief that mental health is as fundamental to a <br/>
        person's well-being as their physical health. We know the current mental health <br/>
        landscape in America is fraught with challenges—millions of people grappling with <br/>
        issues such as depression, anxiety, and stress, yet unable to access the necessary <br/>
        help due to barriers like cost, stigma, or lack of professionals. We aim to change <br/>
        that reality by leveraging the power of AI as a first step in addressing mental health. <br/>
        <br/>
        Reflectica—because everyone deserves a safe space to reflect, express, and heal.
        </AboutSubText>
      </TextContainer>
    </AboutContainer>

    {/*This is the state of mental health stats section*/}

    <StatsContainer>
      <StatsTextContainer>
        <StatsTitle>
          The state of mental health <br/> <span>by the numbers</span>
        </StatsTitle>
        <StatsSubtitle>
          This is why we do what we do.
        </StatsSubtitle>
      </StatsTextContainer>
      <StatsGrid>
        <StatBox>
          <div style={{display: 'flex', alignItems: 'center'}}> 
            <IconImage src={Icon1} alt="Icon1" />
          <div>
            <StatMainText>80 million+</StatMainText>
            <StatSubText>Americans struggle with their mental health</StatSubText>
          </div>
          </div>
        </StatBox>
        <StatBox>
          <div style={{display: 'flex', alignItems: 'center'}}> 
            <IconImage src={Icon2} alt="Icon2" />
          <div>
            <StatMainText>90% of users</StatMainText>
            <StatSubText>Find AI tools effective in improving their mental health</StatSubText>
          </div>
          </div>
        </StatBox>
        <StatBox>
          <div style={{display: 'flex', alignItems: 'center'}}> 
            <IconImage src={Icon3} alt="Icon3" />
          <div>
            <StatMainText>Over 56%</StatMainText>
            <StatSubText>Of struggling Americans have no access to care</StatSubText>
          </div>
          </div>
        </StatBox>
        <StatBox>
          <div style={{display: 'flex', alignItems: 'center'}}> 
            <IconImage src={Icon4} alt="Icon4" />
          <div>
            <StatMainText>$125 per session</StatMainText>
            <StatSubText>Average cost of therapy, not affordable for most</StatSubText>
          </div>
          </div>
        </StatBox>
      </StatsGrid>
    </StatsContainer>

    {/*This is the product description section*/}

    <ProductContainer id="product">
      <ProductTextContainer>
        <ProductTitle>The Product</ProductTitle>
        <ProductSubText>
        Ever felt like you just needed to vent but had no one <br/>
        around to talk to. We created Reflectica for that, a virtual <br/> 
        AI therapist that talks to you and mimics life-like therapy <br/>
        sessions. It can help you self-reflect and give you tips <br/>
        on how to feel better. It learns from you and gets better <br/>
        at understanding you overtime just like a human. <br/>
        <br/>
        Building Reflection 1, our custom fine-tuned LLM and <br/>
        the most advanced AI model for therapy on the planet.
        </ProductSubText>
      </ProductTextContainer>
      <ProductImageContainer>
        <ProductImage src={productImage} alt="Product Image" />
      </ProductImageContainer>
    </ProductContainer>

    {/*This is the pricing section*/}
{/*
    <PricingTitle id="pricing">Simple All-Access Pricing</PricingTitle>
    <PricingSectionCards>
      <PricingCard>
        <CardTitle>Monthly</CardTitle>
        <CardSubText>Not sure if you want to commit? <br/>Try it out for the price of lunch.</CardSubText>
        <DollarAmount>$15</DollarAmount>
        <GreyBox>
          <BulletPoint><img src={Icon5} alt="bullet-point-icon" />Unlimited Sessions</BulletPoint>
          <BulletPoint><img src={Icon5} alt="bullet-point-icon" />Customer Support</BulletPoint>
          <BulletPoint><img src={Icon5} alt="bullet-point-icon" />Renews Monthly</BulletPoint>
          <PricingButton>Get Started</PricingButton>
        </GreyBox>
      </PricingCard>
      <PricingCard middle>
        <CardTitle middle>Annual</CardTitle>
        <CardSubText middle>An entire year of on demand <br/>personalized support.</CardSubText>
        <DollarAmount middle>$99</DollarAmount>
        <GreyBox>
          <BulletPoint><img src={Icon5} alt="bullet-point-icon" />Unlimited Sessions</BulletPoint>
          <BulletPoint><img src={Icon5} alt="bullet-point-icon" />Customer Support</BulletPoint>
          <BulletPoint><img src={Icon5} alt="bullet-point-icon" />Yearly (Save $81)</BulletPoint>
          <PricingButton>Get Started</PricingButton>
        </GreyBox>
      </PricingCard>
      <PricingCard>
        <CardTitle>Lifetime</CardTitle>
        <CardSubText>Love it? Secure access forever. <br/>Limited time offer for early users.</CardSubText>
        <DollarAmount>$299</DollarAmount>
        <GreyBox>
          <BulletPoint><img src={Icon5} alt="bullet-point-icon" />Unlimited Sessions</BulletPoint>
          <BulletPoint><img src={Icon5} alt="bullet-point-icon" />Customer Support</BulletPoint>
          <BulletPoint><img src={Icon5} alt="bullet-point-icon" />Access Forever</BulletPoint>
          <PricingButton>Get Started</PricingButton>
        </GreyBox>
      </PricingCard>
    </PricingSectionCards>



    <TestimonialsContainer id="testimonials">
  <TestimonialsTitle>Our Customer Feedback</TestimonialsTitle>
  <TestimonialsSubText>Don’t take our word for it. Trust our customers.</TestimonialsSubText>
  <TestimonialCardContainer>
   
    <TestimonialCard>
      <TestimonialHeadshotContainer>
        <TestimonialHeadshot src={headshot1} alt="Customer 1" />
      </TestimonialHeadshotContainer>
      <TestimonialName>Customer 1</TestimonialName>
      <TestimonialSubText>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</TestimonialSubText>
      <TestimonialImage src={Icon6} alt="Customer 1 Image" />
    </TestimonialCard>

   
    <TestimonialCard>
      <TestimonialHeadshotContainer>
        <TestimonialHeadshot src={headshot1} alt="Customer 2" />
      </TestimonialHeadshotContainer>
      <TestimonialName>Customer 2</TestimonialName>
      <TestimonialSubText>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</TestimonialSubText>
      <TestimonialImage src={Icon6} alt="Customer 2 Image" />
    </TestimonialCard>

   
    <TestimonialCard>
      <TestimonialHeadshotContainer>
        <TestimonialHeadshot src={headshot1} alt="Customer 3" />
      </TestimonialHeadshotContainer>
      <TestimonialName>Customer 3</TestimonialName>
      <TestimonialSubText>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</TestimonialSubText>
      <TestimonialImage src={Icon6} alt="Customer 3 Image" />
    </TestimonialCard>
  </TestimonialCardContainer>
</TestimonialsContainer>
*/}
  </div>
);

export default Home;

// End of Landing Page Code