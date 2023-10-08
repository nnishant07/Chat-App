import { styled, alpha } from '@mui/material/styles';

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: 20,
    backgroundColor: alpha("#78a7f5", 0.25),
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
}));

export default Search