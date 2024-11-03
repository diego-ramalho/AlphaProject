using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApiTemplate.Migrations
{
    public partial class UpdateLogsFields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "RegisterId",
                table: "Logs",
                newName: "RelatedId");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Logs",
                newName: "UserName");

            migrationBuilder.AddColumn<string>(
                name: "EventMessage",
                table: "Logs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "EventMethod",
                table: "Logs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "EventResult",
                table: "Logs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "EventType",
                table: "Logs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "IP",
                table: "Logs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Origin",
                table: "Logs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PreviousData",
                table: "Logs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Session",
                table: "Logs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "UpdatedData",
                table: "Logs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EventMessage",
                table: "Logs");

            migrationBuilder.DropColumn(
                name: "EventMethod",
                table: "Logs");

            migrationBuilder.DropColumn(
                name: "EventResult",
                table: "Logs");

            migrationBuilder.DropColumn(
                name: "EventType",
                table: "Logs");

            migrationBuilder.DropColumn(
                name: "IP",
                table: "Logs");

            migrationBuilder.DropColumn(
                name: "Origin",
                table: "Logs");

            migrationBuilder.DropColumn(
                name: "PreviousData",
                table: "Logs");

            migrationBuilder.DropColumn(
                name: "Session",
                table: "Logs");

            migrationBuilder.DropColumn(
                name: "UpdatedData",
                table: "Logs");

            migrationBuilder.RenameColumn(
                name: "UserName",
                table: "Logs",
                newName: "Description");

            migrationBuilder.RenameColumn(
                name: "RelatedId",
                table: "Logs",
                newName: "RegisterId");
        }
    }
}
