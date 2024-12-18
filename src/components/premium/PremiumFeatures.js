import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  Avatar,
  ImageList,
  ImageListItem,
  Divider,
} from '@mui/material';
import {
  CheckCircle,
  Star,
  MonetizationOn,
  Security,
  TrendingUp,
  School,
  VerifiedUser,
  Groups,
} from '@mui/icons-material';
import styled from '@mui/material/styles/styled';

const PremiumFeatures = () => {
  const features = [
    {
      icon: <MonetizationOn />,
      title: "Guaranteed Returns",
      description: "Our first trading call typically generates enough profit to cover your entire subscription cost!",
    },
    {
      icon: <Security />,
      title: "SEBI Registered Research Analyst",
      description: "All our trading calls are provided by SEBI registered Research Analysts with proven track records.",
    },
    {
      icon: <TrendingUp />,
      title: "Personal Investment",
      description: "We personally invest in every call we make. Your success is our success!",
    },
    {
      icon: <School />,
      title: "Learn While Trading",
      description: "Understand the rationale behind each call and learn professional trading strategies.",
    },
  ];

  const plans = [
    {
      period: "Monthly",
      originalPrice: "₹2,000",
      discountedPrice: "₹1,000",
      savings: "Save ₹1,000 (50% OFF)",
    },
    {
      period: "Semi-Annually",
      originalPrice: "₹6,500",
      discountedPrice: "₹2,500",
      savings: "Save ₹4,000 (62% OFF)",
    },
    {
      period: "Annually",
      originalPrice: "₹9,000",
      discountedPrice: "₹4,000",
      savings: "Save ₹5,000 (56% OFF)",
      recommended: true,
    },
  ];

  const testimonials = [
    {
      name: "Rajesh Sharma",
      location: "Mumbai, Maharashtra",
      role: "IT Professional",
      avatar: "/avatars/rajesh.jpg",
      testimonial: "I was skeptical at first, but their first call gave me a 40% return! The subscription paid for itself within the first week. Now I'm learning and earning simultaneously.",
      profit: "₹1,25,000 in 3 months",
    },
    {
      name: "Priya Patel",
      location: "Ahmedabad, Gujarat",
      role: "Business Owner",
      avatar: "/avatars/priya.jpg",
      testimonial: "Their analysis is spot-on. What impressed me most was how they explain the logic behind each call. I've not only made profits but learned so much about trading.",
      profit: "₹2,50,000 in 6 months",
    },
    {
      name: "Arun Kumar",
      location: "Bangalore, Karnataka",
      role: "Software Engineer",
      avatar: "/avatars/arun.jpg",
      testimonial: "The fact that they invest in their own calls gives me immense confidence. My portfolio has grown by 85% since I joined their premium service.",
      profit: "₹3,75,000 in 4 months",
    },
    {
      name: "Vikram Singh",
      location: "Delhi, NCR",
      role: "Business Analyst",
      avatar: "/avatars/vikram.jpg",
      testimonial: "Their SEBI registered analysts provide excellent insights. The risk management strategies they teach have transformed my trading approach completely.",
      profit: "₹4,50,000 in 5 months",
    },
    {
      name: "Meera Reddy",
      location: "Hyderabad, Telangana",
      role: "Chartered Accountant",
      avatar: "/avatars/meera.jpg",
      testimonial: "As a CA, I appreciate their detailed analysis and risk assessment. Their calls have consistently delivered profits, making the subscription a no-brainer.",
      profit: "₹2,80,000 in 3 months",
    },
    {
      name: "Sunil Mehta",
      location: "Pune, Maharashtra",
      role: "Retired Bank Manager",
      avatar: "/avatars/sunil.jpg",
      testimonial: "Post-retirement, I was looking for reliable trading guidance. Their calls have helped me generate a steady monthly income that exceeds my pension.",
      profit: "₹5,20,000 in 6 months",
    },
  ];

  const screenshots = [
    '/profit-screenshots/IMG_4835.jpg',
    '/profit-screenshots/IMG_4836.jpg',
    '/profit-screenshots/IMG_4837.jpg',
    '/profit-screenshots/IMG_4838.PNG',
    '/profit-screenshots/IMG_4839.PNG',
    '/profit-screenshots/IMG_4840.jpg',
    '/profit-screenshots/IMG_4841.JPG',
    '/profit-screenshots/IMG_4842.JPG',
    '/profit-screenshots/IMG_4843.JPG',
    '/profit-screenshots/IMG_4844.JPG',
    '/profit-screenshots/IMG_4845.JPG',
    '/profit-screenshots/IMG_4846.JPG',
  ];

  const ScreenshotScroller = styled('div')({
    width: '100vw',
    position: 'relative',
    left: '50%',
    right: '50%',
    marginLeft: '-50vw',
    marginRight: '-50vw',
    overflow: 'hidden',
    marginTop: '2rem',
    marginBottom: '2rem',
    background: 'rgba(0,0,0,0.2)',
    padding: '2rem 0',
  });

  const ScrollingRow = styled('div')({
    display: 'flex',
    animation: 'scrollLeft 60s linear infinite',
    '&:hover': {
      animationPlayState: 'paused',
    },
    '@keyframes scrollLeft': {
      '0%': {
        transform: 'translateX(0)',
      },
      '100%': {
        transform: 'translateX(-50%)',
      },
    },
  });

  const ScreenshotImage = styled('img')({
    height: '300px',
    marginRight: '1rem',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    flexShrink: 0,
  });

  const Screenshots = () => {
    // Split screenshots into two rows
    const row1 = screenshots.slice(0, screenshots.length / 2);
    const row2 = screenshots.slice(screenshots.length / 2);

    return (
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Real Profit Screenshots from Our Members
        </Typography>
        <ScreenshotScroller>
          <ScrollingRow>
            {[...row1, ...row1].map((src, index) => (
              <ScreenshotImage key={index} src={src} alt={`Profit Screenshot ${index + 1}`} />
            ))}
          </ScrollingRow>
          <Box sx={{ my: 2 }} />
          <ScrollingRow sx={{ animation: 'scrollLeft 45s linear infinite reverse' }}>
            {[...row2, ...row2].map((src, index) => (
              <ScreenshotImage key={index} src={src} alt={`Profit Screenshot ${index + 1}`} />
            ))}
          </ScrollingRow>
        </ScreenshotScroller>
      </Box>
    );
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8, overflowX: 'hidden' }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Transform Your Trading Journey
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
          Join thousands of successful traders who've turned their investment into substantial profits
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            background: 'linear-gradient(45deg, #FFD700 30%, #FFA500 90%)',
            color: 'black',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            py: 2,
            px: 4,
          }}
          onClick={() => window.location.href = 'https://superprofile.bio/vig/67604f89ba76450013e93f6f'}
        >
          Access Premium Calls Now
        </Button>
      </Box>

      {/* Key Features */}
      <Grid container spacing={4} sx={{ mb: 8 }}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{
              height: '100%',
              background: 'rgba(22, 28, 36, 0.8)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {feature.icon}
                  <Typography variant="h6" sx={{ ml: 1 }}>
                    {feature.title}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pricing Section */}
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography variant="h4" gutterBottom>
          Choose Your Plan
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          All plans include full access to premium trading calls and learning resources
        </Typography>
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          {plans.map((plan, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card sx={{
                height: '100%',
                position: 'relative',
                background: plan.recommended ? 'linear-gradient(135deg, rgba(255, 215, 0, 0.15) 0%, rgba(255, 215, 0, 0.05) 100%)' : 'rgba(22, 28, 36, 0.8)',
                backdropFilter: 'blur(8px)',
                border: plan.recommended ? '1px solid rgba(255, 215, 0, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)',
                transform: plan.recommended ? 'scale(1.05)' : 'none',
                zIndex: plan.recommended ? 1 : 0,
              }}>
                <CardContent>
                  <Typography variant="h6">{plan.period}</Typography>
                  <Box sx={{ my: 2 }}>
                    <Typography
                      variant="h4"
                      component="span"
                      sx={{ color: plan.recommended ? '#FFD700' : 'inherit' }}
                    >
                      {plan.discountedPrice}
                    </Typography>
                    <Typography
                      variant="body1"
                      component="span"
                      sx={{ textDecoration: 'line-through', ml: 2, color: 'text.secondary' }}
                    >
                      {plan.originalPrice}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="primary.main" sx={{ mb: 2 }}>
                    {plan.savings}
                  </Typography>
                  <Button
                    variant={plan.recommended ? "contained" : "outlined"}
                    fullWidth
                    sx={plan.recommended ? {
                      background: 'linear-gradient(45deg, #FFD700 30%, #FFA500 90%)',
                      color: 'black',
                    } : {}}
                    onClick={() => window.location.href = 'https://superprofile.bio/vig/67604f89ba76450013e93f6f'}
                  >
                    Subscribe Now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Screenshots */}
      <Screenshots />

      {/* Testimonials */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
          Success Stories from Our Members
        </Typography>
        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{
                height: '100%',
                background: 'rgba(22, 28, 36, 0.8)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar src={testimonial.avatar} sx={{ width: 56, height: 56, mr: 2 }} />
                    <Box>
                      <Typography variant="h6">{testimonial.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {testimonial.location}
                      </Typography>
                      <Typography variant="body2" color="primary.main">
                        {testimonial.role}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    "{testimonial.testimonial}"
                  </Typography>
                  <Typography variant="subtitle1" color="#FFD700" sx={{ fontWeight: 'bold' }}>
                    Profit Made: {testimonial.profit}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Trust Indicators */}
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography variant="h4" gutterBottom>
          Why Trust Us?
        </Typography>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <VerifiedUser sx={{ fontSize: 40, color: '#FFD700' }} />
            <Typography variant="h6" sx={{ my: 2 }}>
              SEBI Registered
            </Typography>
            <Typography variant="body2" color="text.secondary">
              All our Research Analysts are SEBI registered professionals
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <TrendingUp sx={{ fontSize: 40, color: '#FFD700' }} />
            <Typography variant="h6" sx={{ my: 2 }}>
              Personal Investment
            </Typography>
            <Typography variant="body2" color="text.secondary">
              We invest our own money in every call we share
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Groups sx={{ fontSize: 40, color: '#FFD700' }} />
            <Typography variant="h6" sx={{ my: 2 }}>
              Growing Community
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Join thousands of successful traders who trust our calls
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {/* Call to Action */}
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Start Your Profitable Trading Journey Today
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Join now and get your first profitable trade call immediately
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            background: 'linear-gradient(45deg, #FFD700 30%, #FFA500 90%)',
            color: 'black',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            py: 2,
            px: 4,
          }}
          onClick={() => window.location.href = 'https://superprofile.bio/signin'}
        >
          Access Premium Calls Now
        </Button>
      </Box>
    </Container>
  );
};

export default PremiumFeatures;
