using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WellnessBuilder.Shared.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class Add_Table_Records_Metadata : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Answers_Nodes_NodeId",
                table: "Answers");

            migrationBuilder.DropTable(
                name: "Conditions");

            migrationBuilder.DropTable(
                name: "ConditionGroups");

            migrationBuilder.DropIndex(
                name: "IX_NodeOptions_NodeId",
                table: "NodeOptions");

            migrationBuilder.DropIndex(
                name: "IX_Edges_FromNodeId",
                table: "Edges");

            migrationBuilder.DropColumn(
                name: "DisplayOrder",
                table: "Nodes");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "SessionOffers",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "SessionOffers",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "Offers",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "Offers",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "OfferRules",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "OfferRules",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "OfferConditions",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "OfferConditions",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "OfferConditionGroups",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "OfferConditionGroups",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "Nodes",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "Nodes",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "NodeOptions",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "NodeOptions",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "Edges",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "Edges",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

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

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "Answers",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "Answers",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateTable(
                name: "EdgeConditionGroups",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    EdgeId = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EdgeConditionGroups", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EdgeConditionGroups_Edges_EdgeId",
                        column: x => x.EdgeId,
                        principalTable: "Edges",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "NodeOptionConditionGroups",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    NodeOptionId = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NodeOptionConditionGroups", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NodeOptionConditionGroups_NodeOptions_NodeOptionId",
                        column: x => x.NodeOptionId,
                        principalTable: "NodeOptions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EdgeConditions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    GroupId = table.Column<Guid>(type: "uuid", nullable: false),
                    AttributeKey = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Operator = table.Column<string>(type: "text", nullable: false),
                    Value = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EdgeConditions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EdgeConditions_EdgeConditionGroups_GroupId",
                        column: x => x.GroupId,
                        principalTable: "EdgeConditionGroups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "NodeOptionConditions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    GroupId = table.Column<Guid>(type: "uuid", nullable: false),
                    AttributeKey = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Operator = table.Column<string>(type: "text", nullable: false),
                    Value = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NodeOptionConditions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NodeOptionConditions_NodeOptionConditionGroups_GroupId",
                        column: x => x.GroupId,
                        principalTable: "NodeOptionConditionGroups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_NodeOptions_NodeId_DisplayOrder",
                table: "NodeOptions",
                columns: new[] { "NodeId", "DisplayOrder" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Edges_FromNodeId_ToNodeId",
                table: "Edges",
                columns: new[] { "FromNodeId", "ToNodeId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Edges_Priority_FromNodeId",
                table: "Edges",
                columns: new[] { "Priority", "FromNodeId" },
                unique: true);

            migrationBuilder.AddCheckConstraint(
                name: "CK_Edge_FromNode_NotEqual_ToNode",
                table: "Edges",
                sql: "\"FromNodeId\" <> \"ToNodeId\"");

            migrationBuilder.CreateIndex(
                name: "IX_EdgeConditionGroups_EdgeId",
                table: "EdgeConditionGroups",
                column: "EdgeId");

            migrationBuilder.CreateIndex(
                name: "IX_EdgeConditions_GroupId",
                table: "EdgeConditions",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_NodeOptionConditionGroups_NodeOptionId",
                table: "NodeOptionConditionGroups",
                column: "NodeOptionId");

            migrationBuilder.CreateIndex(
                name: "IX_NodeOptionConditions_GroupId",
                table: "NodeOptionConditions",
                column: "GroupId");

            migrationBuilder.AddForeignKey(
                name: "FK_Answers_Nodes_NodeId",
                table: "Answers",
                column: "NodeId",
                principalTable: "Nodes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Answers_Nodes_NodeId",
                table: "Answers");

            migrationBuilder.DropTable(
                name: "EdgeConditions");

            migrationBuilder.DropTable(
                name: "NodeOptionConditions");

            migrationBuilder.DropTable(
                name: "EdgeConditionGroups");

            migrationBuilder.DropTable(
                name: "NodeOptionConditionGroups");

            migrationBuilder.DropIndex(
                name: "IX_NodeOptions_NodeId_DisplayOrder",
                table: "NodeOptions");

            migrationBuilder.DropIndex(
                name: "IX_Edges_FromNodeId_ToNodeId",
                table: "Edges");

            migrationBuilder.DropIndex(
                name: "IX_Edges_Priority_FromNodeId",
                table: "Edges");

            migrationBuilder.DropCheckConstraint(
                name: "CK_Edge_FromNode_NotEqual_ToNode",
                table: "Edges");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "SessionOffers");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "SessionOffers");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "Offers");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "Offers");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "OfferRules");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "OfferRules");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "OfferConditions");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "OfferConditions");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "OfferConditionGroups");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "OfferConditionGroups");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "Nodes");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "Nodes");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "NodeOptions");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "NodeOptions");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "Edges");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "Edges");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "Answers");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "Answers");

            migrationBuilder.AddColumn<int>(
                name: "DisplayOrder",
                table: "Nodes",
                type: "integer",
                nullable: false,
                defaultValue: 0);

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

            migrationBuilder.CreateTable(
                name: "ConditionGroups",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    EdgeId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConditionGroups", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ConditionGroups_Edges_EdgeId",
                        column: x => x.EdgeId,
                        principalTable: "Edges",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Conditions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    GroupId = table.Column<Guid>(type: "uuid", nullable: false),
                    AttributeKey = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Operator = table.Column<string>(type: "text", nullable: false),
                    Value = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Conditions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Conditions_ConditionGroups_GroupId",
                        column: x => x.GroupId,
                        principalTable: "ConditionGroups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_NodeOptions_NodeId",
                table: "NodeOptions",
                column: "NodeId");

            migrationBuilder.CreateIndex(
                name: "IX_Edges_FromNodeId",
                table: "Edges",
                column: "FromNodeId");

            migrationBuilder.CreateIndex(
                name: "IX_ConditionGroups_EdgeId",
                table: "ConditionGroups",
                column: "EdgeId");

            migrationBuilder.CreateIndex(
                name: "IX_Conditions_GroupId",
                table: "Conditions",
                column: "GroupId");

            migrationBuilder.AddForeignKey(
                name: "FK_Answers_Nodes_NodeId",
                table: "Answers",
                column: "NodeId",
                principalTable: "Nodes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
