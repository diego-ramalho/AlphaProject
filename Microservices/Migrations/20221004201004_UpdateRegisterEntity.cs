using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApiTemplate.Migrations
{
    public partial class UpdateRegisterEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Dni",
                table: "Registers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Registers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "LastContact",
                table: "Registers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Dni",
                table: "Registers");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "Registers");

            migrationBuilder.DropColumn(
                name: "LastContact",
                table: "Registers");
        }
    }
}
