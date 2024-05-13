import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

function Home() {
  const { t } = useTranslation();
  return (
    <Typography variant="h5" marginBottom={5}>
      {t("Home")}
    </Typography>
  );
}

export default Home;
