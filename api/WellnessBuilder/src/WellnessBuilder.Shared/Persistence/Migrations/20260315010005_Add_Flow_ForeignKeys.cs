using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WellnessBuilder.Shared.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class Add_Flow_ForeignKeys : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Flow",
                table: "Flow");

            migrationBuilder.RenameTable(
                name: "Flow",
                newName: "Flows");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Flows",
                table: "Flows",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Offers_FlowId",
                table: "Offers",
                column: "FlowId");

            migrationBuilder.CreateIndex(
                name: "IX_Nodes_FlowId",
                table: "Nodes",
                column: "FlowId");

            migrationBuilder.CreateIndex(
                name: "IX_Edges_FlowId",
                table: "Edges",
                column: "FlowId");

            migrationBuilder.CreateIndex(
                name: "IX_Flows_IsActive",
                table: "Flows",
                column: "IsActive",
                unique: true,
                filter: "\"IsActive\" = true");

            migrationBuilder.AddForeignKey(
                name: "FK_Edges_Flows_FlowId",
                table: "Edges",
                column: "FlowId",
                principalTable: "Flows",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Nodes_Flows_FlowId",
                table: "Nodes",
                column: "FlowId",
                principalTable: "Flows",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Offers_Flows_FlowId",
                table: "Offers",
                column: "FlowId",
                principalTable: "Flows",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Edges_Flows_FlowId",
                table: "Edges");

            migrationBuilder.DropForeignKey(
                name: "FK_Nodes_Flows_FlowId",
                table: "Nodes");

            migrationBuilder.DropForeignKey(
                name: "FK_Offers_Flows_FlowId",
                table: "Offers");

            migrationBuilder.DropIndex(
                name: "IX_Offers_FlowId",
                table: "Offers");

            migrationBuilder.DropIndex(
                name: "IX_Nodes_FlowId",
                table: "Nodes");

            migrationBuilder.DropIndex(
                name: "IX_Edges_FlowId",
                table: "Edges");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Flows",
                table: "Flows");

            migrationBuilder.DropIndex(
                name: "IX_Flows_IsActive",
                table: "Flows");

            migrationBuilder.RenameTable(
                name: "Flows",
                newName: "Flow");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Flow",
                table: "Flow",
                column: "Id");
        }
    }
}
