using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace HotelManagement.Service.Data.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Buildings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Buildings", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "InventoryItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InventoryItems", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Rooms",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    BuildingId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rooms", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Rooms_Buildings_BuildingId",
                        column: x => x.BuildingId,
                        principalTable: "Buildings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Storages",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    BuildingId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Storages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Storages_Buildings_BuildingId",
                        column: x => x.BuildingId,
                        principalTable: "Buildings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "InventoryItemLocations",
                columns: table => new
                {
                    InventoryItemId = table.Column<int>(type: "integer", nullable: false),
                    StorageId = table.Column<int>(type: "integer", nullable: false),
                    Quantity = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InventoryItemLocations", x => new { x.InventoryItemId, x.StorageId });
                    table.ForeignKey(
                        name: "FK_InventoryItemLocations_InventoryItems_InventoryItemId",
                        column: x => x.InventoryItemId,
                        principalTable: "InventoryItems",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_InventoryItemLocations_Storages_StorageId",
                        column: x => x.StorageId,
                        principalTable: "Storages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "InventoryMovements",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    InventoryItemId = table.Column<int>(type: "integer", nullable: false),
                    FromStorageId = table.Column<int>(type: "integer", nullable: true),
                    ToStorageId = table.Column<int>(type: "integer", nullable: true),
                    ToRoomId = table.Column<int>(type: "integer", nullable: true),
                    MovementType = table.Column<byte>(type: "smallint", nullable: false),
                    Quantity = table.Column<int>(type: "integer", nullable: false),
                    MovementDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Notes = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InventoryMovements", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InventoryMovements_InventoryItems_InventoryItemId",
                        column: x => x.InventoryItemId,
                        principalTable: "InventoryItems",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_InventoryMovements_Rooms_ToRoomId",
                        column: x => x.ToRoomId,
                        principalTable: "Rooms",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_InventoryMovements_Storages_FromStorageId",
                        column: x => x.FromStorageId,
                        principalTable: "Storages",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_InventoryMovements_Storages_ToStorageId",
                        column: x => x.ToStorageId,
                        principalTable: "Storages",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "WorkOrders",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    BuildingId = table.Column<int>(type: "integer", nullable: true),
                    RoomId = table.Column<int>(type: "integer", nullable: true),
                    StorageId = table.Column<int>(type: "integer", nullable: true),
                    InventoryItemId = table.Column<int>(type: "integer", nullable: true),
                    WorkOrderType = table.Column<byte>(type: "smallint", nullable: false),
                    Status = table.Column<byte>(type: "smallint", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CompletedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkOrders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WorkOrders_Buildings_BuildingId",
                        column: x => x.BuildingId,
                        principalTable: "Buildings",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_WorkOrders_InventoryItems_InventoryItemId",
                        column: x => x.InventoryItemId,
                        principalTable: "InventoryItems",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_WorkOrders_Rooms_RoomId",
                        column: x => x.RoomId,
                        principalTable: "Rooms",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_WorkOrders_Storages_StorageId",
                        column: x => x.StorageId,
                        principalTable: "Storages",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_InventoryItemLocations_StorageId",
                table: "InventoryItemLocations",
                column: "StorageId");

            migrationBuilder.CreateIndex(
                name: "IX_InventoryMovements_FromStorageId",
                table: "InventoryMovements",
                column: "FromStorageId");

            migrationBuilder.CreateIndex(
                name: "IX_InventoryMovements_InventoryItemId",
                table: "InventoryMovements",
                column: "InventoryItemId");

            migrationBuilder.CreateIndex(
                name: "IX_InventoryMovements_ToRoomId",
                table: "InventoryMovements",
                column: "ToRoomId");

            migrationBuilder.CreateIndex(
                name: "IX_InventoryMovements_ToStorageId",
                table: "InventoryMovements",
                column: "ToStorageId");

            migrationBuilder.CreateIndex(
                name: "IX_Rooms_BuildingId",
                table: "Rooms",
                column: "BuildingId");

            migrationBuilder.CreateIndex(
                name: "IX_Storages_BuildingId",
                table: "Storages",
                column: "BuildingId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkOrders_BuildingId",
                table: "WorkOrders",
                column: "BuildingId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkOrders_InventoryItemId",
                table: "WorkOrders",
                column: "InventoryItemId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkOrders_RoomId",
                table: "WorkOrders",
                column: "RoomId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkOrders_StorageId",
                table: "WorkOrders",
                column: "StorageId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "InventoryItemLocations");

            migrationBuilder.DropTable(
                name: "InventoryMovements");

            migrationBuilder.DropTable(
                name: "WorkOrders");

            migrationBuilder.DropTable(
                name: "InventoryItems");

            migrationBuilder.DropTable(
                name: "Rooms");

            migrationBuilder.DropTable(
                name: "Storages");

            migrationBuilder.DropTable(
                name: "Buildings");
        }
    }
}
