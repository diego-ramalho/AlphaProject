using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApiTemplate.Migrations
{
    public partial class InitialInserts : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "UserRoles",
                columns: new[] { "RoleName" },
                values: new object[,] { 
                    { "Admin" }, 
                    { "User" } 
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Name", "Email", "Password", "RoleId" },
                values: new object[,] {
                    { "Admin", "diegoramalho.as@gmail.com", "P/0347hXeKObfaBEEyg1Sw==", 1 },
                    { "User", "drlweb@gmail.com", "itceu9Uasqk=", 2 }
                });

            migrationBuilder.InsertData(
                table: "Zones",
                columns: new[] { "ZoneName" },
                values: new object[,] {
                    { "Zona 01" },
                    { "Zona 02" },
                    { "Zona 03" },
                    { "Zona 04" },
                    { "Zona 05" },
                    { "Zona 06" }
                });

            migrationBuilder.InsertData(
                table: "Filters",
                columns: new[] { "FilterName" },
                values: new object[,] {
                    { "Filter 01" },
                    { "Filter 02" },
                    { "Filter 03" },
                    { "Filter 04" }
                });

            migrationBuilder.InsertData(
                table: "Registers",
                columns: new[] { "Address", "Number", "ZoneId" },
                values: new object[,] {
                    { "Address 01", "101", 1 },
                    { "Address 02", "202", 2 }
                });

            migrationBuilder.InsertData(
                table: "RegisterFilters",
                columns: new[] { "RegisterId", "FilterId" },
                values: new object[,] {
                    { 1, 1 },
                    { 1, 4 },
                    { 2, 2 },
                    { 2, 3 },
                    { 2, 4 }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                @"delete from Users;"
                );

            migrationBuilder.Sql(
                @"delete from UserRoles;"
                );

            migrationBuilder.Sql(
                @"delete from Zones;"
                );

            migrationBuilder.Sql(
                @"delete from Filters;"
                );

            migrationBuilder.Sql(
                @"delete from Registers;"
                );

            migrationBuilder.Sql(
                @"delete from RegisterFilters;"
                );

            //migrationBuilder.DeleteData(
            //    table: "Users",
            //    keyColumn: "Id",
            //    keyValue: 1);

            //migrationBuilder.DeleteData(
            //    table: "Users",
            //    keyColumn: "Id",
            //    keyValue: 2);

            //migrationBuilder.DeleteData(
            //    table: "UserRoles",
            //    keyColumn: "Id",
            //    keyValue: 1);

            //migrationBuilder.DeleteData(
            //    table: "UserRoles",
            //    keyColumn: "Id",
            //    keyValue: 2);
        }
    }
}
