using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WellnessBuilder.Shared.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class Remove_FK_Flow_Offer : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Offers_Flows_FlowId",
                table: "Offers");

            migrationBuilder.AlterColumn<Guid>(
                name: "FlowId",
                table: "Offers",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AddForeignKey(
                name: "FK_Offers_Flows_FlowId",
                table: "Offers",
                column: "FlowId",
                principalTable: "Flows",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Offers_Flows_FlowId",
                table: "Offers");

            migrationBuilder.AlterColumn<Guid>(
                name: "FlowId",
                table: "Offers",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Offers_Flows_FlowId",
                table: "Offers",
                column: "FlowId",
                principalTable: "Flows",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
