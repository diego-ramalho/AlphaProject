using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApiTemplate.Migrations
{
    public partial class RegistersNewAttr : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Adviser",
                table: "Registers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Fee",
                table: "Registers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "FinalSalePrice",
                table: "Registers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Particular",
                table: "Registers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "RealEstate",
                table: "Registers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Reduction",
                table: "Registers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "SaleDate",
                table: "Registers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Adviser",
                table: "Registers");

            migrationBuilder.DropColumn(
                name: "Fee",
                table: "Registers");

            migrationBuilder.DropColumn(
                name: "FinalSalePrice",
                table: "Registers");

            migrationBuilder.DropColumn(
                name: "Particular",
                table: "Registers");

            migrationBuilder.DropColumn(
                name: "RealEstate",
                table: "Registers");

            migrationBuilder.DropColumn(
                name: "Reduction",
                table: "Registers");

            migrationBuilder.DropColumn(
                name: "SaleDate",
                table: "Registers");
        }
    }
}
