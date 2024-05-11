### HotelManagement

#### Project Structure

```
./
- Data
- Service
- WebApi
- Ui
```

#### ERP Diagram

![erp_digram](https://gcdnb.pbrd.co/images/hPdGnkpysl78.png?o=1)

#### Migrations

```
/Service
Add-Migration InitialCreate -Context AppDbContext -OutputDir Data\Migrations
Update-Database -Context AppDbContext

Add-Migration Initial -Context IdentityDbContext -OutputDir Identity\Migrations
Update-Database -Context IdentityDbContext
```

#### Using axios with token example

```js
import { handleApiError } from "../../utils/helpers";
import { api, useInterceptor } from "../../utils/api";
import { useEffect } from "react";

function Home() {
  useInterceptor();
  useEffect(() => {
    testReqAuth();
  }, []);

  const testReqAuth = async () => {
    try {
      const response = await api.get("/test");
      console.log(response);
    } catch (error) {
      let message = handleApiError(error);
      console.log(message);
    }
  };

  return <div>Home</div>;
}

export default Home;

```

#### Resources

- https://learn.microsoft.com/en-us/aspnet/core/security/authentication/identity-api-authorization?view=aspnetcore-8.0
- https://reactrouter.com/en/main/start/tutorial
- https://mui.com/material-ui/getting-started/templates/
- https://github.com/devias-io/material-kit-react/tree/main
- https://github.com/mui/material-ui/tree/v5.15.17/docs/data/material/getting-started/templates
- https://github.com/remix-run/react-router/issues/10637