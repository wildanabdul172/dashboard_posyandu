import { Box, Container, Typography, styled } from '@mui/material';

const FooterWrapper = styled(Container)(
  ({ theme }) => `
        margin-top: ${theme.spacing(4)};
`
);

function Footer() {
  return (
    <Container maxWidth="lg" sx={{ mt: 8 }} >
        <Typography textAlign="center" variant="subtitle1">
          Crafted by{' '}
            Wildan Abdul Barri
        </Typography>
      </Container>
  );
}

export default Footer;
