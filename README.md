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
```