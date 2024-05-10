﻿// <auto-generated />
using System;
using HotelManagement.Service.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace HotelManagement.Service.Data.Migrations
{
    [DbContext(typeof(HotelManagementDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("HotelManagement.Data.Models.Building", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Buildings");
                });

            modelBuilder.Entity("HotelManagement.Data.Models.InventoryItem", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("InventoryItems");
                });

            modelBuilder.Entity("HotelManagement.Data.Models.InventoryItemLocation", b =>
                {
                    b.Property<int>("InventoryItemId")
                        .HasColumnType("integer");

                    b.Property<int>("StorageId")
                        .HasColumnType("integer");

                    b.Property<int>("Quantity")
                        .HasColumnType("integer");

                    b.HasKey("InventoryItemId", "StorageId");

                    b.HasIndex("StorageId");

                    b.ToTable("InventoryItemLocations");
                });

            modelBuilder.Entity("HotelManagement.Data.Models.InventoryMovement", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int?>("FromStorageId")
                        .HasColumnType("integer");

                    b.Property<int>("InventoryItemId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("MovementDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<byte>("MovementType")
                        .HasColumnType("smallint");

                    b.Property<string>("Notes")
                        .HasColumnType("text");

                    b.Property<int>("Quantity")
                        .HasColumnType("integer");

                    b.Property<int?>("ToRoomId")
                        .HasColumnType("integer");

                    b.Property<int?>("ToStorageId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("FromStorageId");

                    b.HasIndex("InventoryItemId");

                    b.HasIndex("ToRoomId");

                    b.HasIndex("ToStorageId");

                    b.ToTable("InventoryMovements");
                });

            modelBuilder.Entity("HotelManagement.Data.Models.Room", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("BuildingId")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("BuildingId");

                    b.ToTable("Rooms");
                });

            modelBuilder.Entity("HotelManagement.Data.Models.Storage", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("BuildingId")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("BuildingId");

                    b.ToTable("Storages");
                });

            modelBuilder.Entity("HotelManagement.Data.Models.WorkOrder", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int?>("BuildingId")
                        .HasColumnType("integer");

                    b.Property<DateTime?>("CompletedDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int?>("InventoryItemId")
                        .HasColumnType("integer");

                    b.Property<int?>("RoomId")
                        .HasColumnType("integer");

                    b.Property<byte>("Status")
                        .HasColumnType("smallint");

                    b.Property<int?>("StorageId")
                        .HasColumnType("integer");

                    b.Property<byte>("WorkOrderType")
                        .HasColumnType("smallint");

                    b.HasKey("Id");

                    b.HasIndex("BuildingId");

                    b.HasIndex("InventoryItemId");

                    b.HasIndex("RoomId");

                    b.HasIndex("StorageId");

                    b.ToTable("WorkOrders");
                });

            modelBuilder.Entity("HotelManagement.Data.Models.InventoryItemLocation", b =>
                {
                    b.HasOne("HotelManagement.Data.Models.InventoryItem", "InventoryItem")
                        .WithMany("InventoryItemLocations")
                        .HasForeignKey("InventoryItemId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("HotelManagement.Data.Models.Storage", "Storage")
                        .WithMany("InventoryItemLocations")
                        .HasForeignKey("StorageId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("InventoryItem");

                    b.Navigation("Storage");
                });

            modelBuilder.Entity("HotelManagement.Data.Models.InventoryMovement", b =>
                {
                    b.HasOne("HotelManagement.Data.Models.Storage", "FromStorage")
                        .WithMany()
                        .HasForeignKey("FromStorageId");

                    b.HasOne("HotelManagement.Data.Models.InventoryItem", "InventoryItem")
                        .WithMany()
                        .HasForeignKey("InventoryItemId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("HotelManagement.Data.Models.Room", "ToRoom")
                        .WithMany()
                        .HasForeignKey("ToRoomId");

                    b.HasOne("HotelManagement.Data.Models.Storage", "ToStorage")
                        .WithMany()
                        .HasForeignKey("ToStorageId");

                    b.Navigation("FromStorage");

                    b.Navigation("InventoryItem");

                    b.Navigation("ToRoom");

                    b.Navigation("ToStorage");
                });

            modelBuilder.Entity("HotelManagement.Data.Models.Room", b =>
                {
                    b.HasOne("HotelManagement.Data.Models.Building", "Building")
                        .WithMany("Rooms")
                        .HasForeignKey("BuildingId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Building");
                });

            modelBuilder.Entity("HotelManagement.Data.Models.Storage", b =>
                {
                    b.HasOne("HotelManagement.Data.Models.Building", "Building")
                        .WithMany("Storages")
                        .HasForeignKey("BuildingId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Building");
                });

            modelBuilder.Entity("HotelManagement.Data.Models.WorkOrder", b =>
                {
                    b.HasOne("HotelManagement.Data.Models.Building", "Building")
                        .WithMany()
                        .HasForeignKey("BuildingId");

                    b.HasOne("HotelManagement.Data.Models.InventoryItem", "InventoryItem")
                        .WithMany()
                        .HasForeignKey("InventoryItemId");

                    b.HasOne("HotelManagement.Data.Models.Room", "Room")
                        .WithMany()
                        .HasForeignKey("RoomId");

                    b.HasOne("HotelManagement.Data.Models.Storage", "Storage")
                        .WithMany()
                        .HasForeignKey("StorageId");

                    b.Navigation("Building");

                    b.Navigation("InventoryItem");

                    b.Navigation("Room");

                    b.Navigation("Storage");
                });

            modelBuilder.Entity("HotelManagement.Data.Models.Building", b =>
                {
                    b.Navigation("Rooms");

                    b.Navigation("Storages");
                });

            modelBuilder.Entity("HotelManagement.Data.Models.InventoryItem", b =>
                {
                    b.Navigation("InventoryItemLocations");
                });

            modelBuilder.Entity("HotelManagement.Data.Models.Storage", b =>
                {
                    b.Navigation("InventoryItemLocations");
                });
#pragma warning restore 612, 618
        }
    }
}
