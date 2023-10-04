import React from 'react';
import { Link } from "react-router-dom";
import '../styles/Home.css';
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

    {/*This is the main page that the user first sees*/}

    <div className='outer-container' >
      <div className='main-container'>
        <div className='main-text'>
          15-min audio therapy <br /> sessions with <span>AI</span>
        </div>
        <div className='sub-text'>
          Conduct hyper-realistic life-like audio therapy sessions with an AI therapist.<br />Disclaimer: this is a self-reflection tool, not a substitute for professional help.
        </div>
        <Link to="/signup">
          <div className='button-wrapper'>
            <button type="button" className="rounded-md shadow-sm">Get Started</button>
          </div>
        </Link>
      </div>
      <div className='side-container'>
        <img className= 'image' src={homeImage} alt="Home Graphic" />
      </div>
    </div>

    {/*This is the about section*/}

    <div className='about-container' id="aboutUs">
      <div className='image-container'>
        <img className='about-image' src={aboutImage} alt="About Us" />
      </div>
      <div className='text-container'>
        <div className='about-title'>About Us</div>
        <div className='about-sub-text'>
          Our mission is grounded in the belief that mental health is as fundamental to a <br />
          person's well-being as their physical health. We know the current mental health <br />
          landscape in America is fraught with challenges—millions of people grappling with <br />
          issues such as depression, anxiety, and stress, yet unable to access the necessary <br />
          help due to barriers like cost, stigma, or lack of professionals. We aim to change <br />
          that reality by leveraging the power of AI as a first step in addressing mental health. <br />
          <br />
          Reflectica—because everyone deserves a safe space to reflect, express, and heal.
        </div>
      </div>
    </div>

    {/*This is the state of mental health stats section*/}

    <div className='stats-container'>
      <div className='stats-text-container'>
        <div className='stats-title'>
          The state of mental health <br /> <span>by the numbers</span>
        </div>
        <div className='stats-subtitle'>
          This is why we do what we do.
        </div>
      </div>
      <div className='stats-grid'>
        <div className='stat-box'>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img className='icon-image' src={Icon1} alt="Icon1" />
            <div>
              <div className='stat-main-text'>80 million+</div>
              <div className='stat-sub-text'>Americans struggle with their mental health</div>
            </div>
          </div>
        </div>
        <div className='stat-box'>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img className='icon-image' src={Icon2} alt="Icon2" />
            <div>
              <div className='stat-main-text'>90% of users</div>
              <div className='stat-sub-text'>Find AI tools effective in improving their mental health</div>
            </div>
          </div>
        </div>
        <div className='stat-box'>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img className='icon-image' src={Icon3} alt="Icon3" />
            <div>
              <div className='stat-main-text'>Over 56%</div>
              <div className='stat-sub-text'>Of struggling Americans have no access to care</div>
            </div>
          </div>
        </div>
        <div className='stat-box'>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img className='icon-image' src={Icon4} alt="Icon4" />
            <div>
              <div className='stat-main-text'>$125 per session</div>
              <div className='stat-sub-text'>Average cost of therapy, not affordable for most</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/*This is the product description section*/}

    <div className='product-container' id="product">
      <div className='product-text-container'>
        <div className='product-title '>The Product</div>
        <div className='product-sub-text'>
          Ever felt like you just needed to vent but had no one <br />
          around to talk to. We created Reflectica for that, a virtual <br />
          AI therapist that talks to you and mimics life-like therapy <br />
          sessions. It can help you self-reflect and give you tips <br />
          on how to feel better. It learns from you and gets better <br />
          at understanding you overtime just like a human. <br />
          <br />
          Building Reflection 1, our custom fine-tuned LLM and <br />
          the most advanced AI model for therapy on the planet.
        </div>
      </div>
      <div className='product-image-container '>
        <img className='product-image' src={productImage} alt="Product Image" />
      </div>
    </div>

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