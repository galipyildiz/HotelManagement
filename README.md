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

#### Resources
- https://learn.microsoft.com/en-us/aspnet/core/security/authentication/identity-api-authorization?view=aspnetcore-8.0