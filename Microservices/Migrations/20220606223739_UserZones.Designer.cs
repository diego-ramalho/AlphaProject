﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WebApiTemplate.Data;

#nullable disable

namespace WebApiTemplate.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20220606223739_UserZones")]
    partial class UserZones
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("WebApiTemplate.Models.Filter", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("FilterName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Filters");
                });

            modelBuilder.Entity("WebApiTemplate.Models.Register", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Number")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ZoneId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ZoneId");

                    b.ToTable("Registers");
                });

            modelBuilder.Entity("WebApiTemplate.Models.RegisterFilters", b =>
                {
                    b.Property<int>("RegisterId")
                        .HasColumnType("int");

                    b.Property<int>("FilterId")
                        .HasColumnType("int");

                    b.HasKey("RegisterId", "FilterId");

                    b.HasIndex("FilterId");

                    b.ToTable("RegisterFilters");
                });

            modelBuilder.Entity("WebApiTemplate.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("RoleId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("WebApiTemplate.Models.UserRoles", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("RoleName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("UserRoles");
                });

            modelBuilder.Entity("WebApiTemplate.Models.UserZones", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<int>("ZoneId")
                        .HasColumnType("int");

                    b.HasKey("UserId", "ZoneId");

                    b.HasIndex("ZoneId");

                    b.ToTable("UserZones");
                });

            modelBuilder.Entity("WebApiTemplate.Models.Zone", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Zones");
                });

            modelBuilder.Entity("WebApiTemplate.Models.Register", b =>
                {
                    b.HasOne("WebApiTemplate.Models.Zone", "Zone")
                        .WithMany("Registers")
                        .HasForeignKey("ZoneId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Zone");
                });

            modelBuilder.Entity("WebApiTemplate.Models.RegisterFilters", b =>
                {
                    b.HasOne("WebApiTemplate.Models.Filter", "Filter")
                        .WithMany("RegisterFilters")
                        .HasForeignKey("FilterId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WebApiTemplate.Models.Register", "Register")
                        .WithMany("RegisterFilters")
                        .HasForeignKey("RegisterId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Filter");

                    b.Navigation("Register");
                });

            modelBuilder.Entity("WebApiTemplate.Models.User", b =>
                {
                    b.HasOne("WebApiTemplate.Models.UserRoles", "UserRoles")
                        .WithMany("Users")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("UserRoles");
                });

            modelBuilder.Entity("WebApiTemplate.Models.UserZones", b =>
                {
                    b.HasOne("WebApiTemplate.Models.User", "User")
                        .WithMany("UserZones")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WebApiTemplate.Models.Zone", "Zone")
                        .WithMany("UserZones")
                        .HasForeignKey("ZoneId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");

                    b.Navigation("Zone");
                });

            modelBuilder.Entity("WebApiTemplate.Models.Filter", b =>
                {
                    b.Navigation("RegisterFilters");
                });

            modelBuilder.Entity("WebApiTemplate.Models.Register", b =>
                {
                    b.Navigation("RegisterFilters");
                });

            modelBuilder.Entity("WebApiTemplate.Models.User", b =>
                {
                    b.Navigation("UserZones");
                });

            modelBuilder.Entity("WebApiTemplate.Models.UserRoles", b =>
                {
                    b.Navigation("Users");
                });

            modelBuilder.Entity("WebApiTemplate.Models.Zone", b =>
                {
                    b.Navigation("Registers");

                    b.Navigation("UserZones");
                });
#pragma warning restore 612, 618
        }
    }
}