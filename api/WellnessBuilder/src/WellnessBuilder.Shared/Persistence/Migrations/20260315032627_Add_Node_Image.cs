using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WellnessBuilder.Shared.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class Add_Node_Image : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Answers_Nodes_NodeId",
                table: "Answers");

            migrationBuilder.DropForeignKey(
                name: "FK_Offers_Flows_FlowId",
                table: "Offers");

            migrationBuilder.DropIndex(
                name: "IX_Offers_FlowId",
                table: "Offers");

            migrationBuilder.DropColumn(
                name: "FlowId",
                table: "Offers");

            migrationBuilder.AddColumn<string>(
                name: "Why",
                table: "Offers",
                type: "character varying(2000)",
                maxLength: 2000,
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "Nodes",
                type: "character varying(500)",
                maxLength: 500,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "Body",
                table: "Nodes",
                type: "character varying(4000)",
                maxLength: 4000,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "AttributeKey",
                table: "Nodes",
                type: "character varying(100)",
                maxLength: 100,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "Nodes",
                type: "character varying(2000)",
                maxLength: 2000,
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "OfferId",
                table: "Nodes",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "PositionX",
                table: "Nodes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "PositionY",
                table: "Nodes",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AlterColumn<string>(
                name: "Value",
                table: "Answers",
                type: "character varying(1000)",
                maxLength: 1000,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "AttributeKey",
                table: "Answers",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Admins",
                type: "character varying(256)",
                maxLength: 256,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.CreateIndex(
                name: "IX_Admins_Email",
                table: "Admins",
                column: "Email",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Answers_Nodes_NodeId",
                table: "Answers",
                column: "NodeId",
                principalTable: "Nodes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Answers_Nodes_NodeId",
                table: "Answers");

            migrationBuilder.DropIndex(
                name: "IX_Admins_Email",
                table: "Admins");

            migrationBuilder.DropColumn(
                name: "Why",
                table: "Offers");

            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "Nodes");

            migrationBuilder.DropColumn(
                name: "OfferId",
                table: "Nodes");

            migrationBuilder.DropColumn(
                name: "PositionX",
                table: "Nodes");

            migrationBuilder.DropColumn(
                name: "PositionY",
                table: "Nodes");

            migrationBuilder.AddColumn<Guid>(
                name: "FlowId",
                table: "Offers",
                type: "uuid",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "Nodes",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(500)",
                oldMaxLength: 500);

            migrationBuilder.AlterColumn<string>(
                name: "Body",
                table: "Nodes",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(4000)",
                oldMaxLength: 4000,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "AttributeKey",
                table: "Nodes",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(100)",
                oldMaxLength: 100,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Value",
                table: "Answers",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(1000)",
                oldMaxLength: 1000);

            migrationBuilder.AlterColumn<string>(
                name: "AttributeKey",
                table: "Answers",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(100)",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Admins",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(256)",
                oldMaxLength: 256);

            migrationBuilder.CreateIndex(
                name: "IX_Offers_FlowId",
                table: "Offers",
                column: "FlowId");

            migrationBuilder.AddForeignKey(
                name: "FK_Answers_Nodes_NodeId",
                table: "Answers",
                column: "NodeId",
                principalTable: "Nodes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Offers_Flows_FlowId",
                table: "Offers",
                column: "FlowId",
                principalTable: "Flows",
                principalColumn: "Id");
        }
    }
}
