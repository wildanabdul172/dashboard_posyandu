import {
  Tooltip,
  TooltipProps,
  tooltipClasses,
  styled,
  Avatar,
  Card
} from '@mui/material';
import Link from 'src/components/Link';

const LogoWrapper = styled(Link)(
  ({ theme }) => `
        color: ${theme.palette.text.primary};
        display: flex;
        text-decoration: none;
        width: 53px;
        margin: 0 auto;
        font-weight: ${theme.typography.fontWeightBold};
`
);


const TooltipWrapper = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.colors.alpha.trueWhite[100],
    color: theme.palette.getContrastText(theme.colors.alpha.trueWhite[100]),
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 'bold',
    borderRadius: theme.general.borderRadiusSm,
    boxShadow:
      '0 .2rem .8rem rgba(7,9,25,.18), 0 .08rem .15rem rgba(7,9,25,.15)'
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.colors.alpha.trueWhite[100]
  }
}));

const AvatarWrapper = styled(Card)(
  ({ theme }) => `

    position: relative;
    overflow: visible;
    display: inline-block;
    margin-top: -${theme.spacing(0)};
    margin-left: ${theme.spacing(0)};

    .MuiAvatar-root {
      width: ${theme.spacing(6)};
      height: ${theme.spacing(6)};
    }
`
);

function Logo() {

  return (
    <TooltipWrapper
      title="Posyandu Admin Dashboard"
      arrow
    >
      <LogoWrapper href="/">
      <AvatarWrapper>
        <Avatar variant="rounded" src={'/static/images/avatars/Posyandu_Logo_White.png'} />
      </AvatarWrapper>
      </LogoWrapper>
    </TooltipWrapper>
  );
}

export default Logo;
