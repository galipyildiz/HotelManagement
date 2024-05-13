import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

function WorkOrders() {
  const { t } = useTranslation();

  return (
    <Typography variant="h5" marginBottom={5}>
      {t("WorkOrders")}
    </Typography>
  );
}

export default WorkOrders;
