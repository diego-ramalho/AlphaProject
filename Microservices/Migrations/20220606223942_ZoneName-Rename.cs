using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApiTemplate.Migrations
{
    public partial class ZoneNameRename : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Zones",
                newName: "ZoneName");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ZoneName",
                table: "Zones",
                newName: "Name");
        }
    }
}
