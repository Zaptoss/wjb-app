using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WellnessBuilder.Shared.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class Drop_OfferRule_Table : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OfferConditionGroups_OfferRules_OfferRuleId",
                table: "OfferConditionGroups");

            migrationBuilder.DropTable(
                name: "OfferRules");

            migrationBuilder.RenameColumn(
                name: "OfferRuleId",
                table: "OfferConditionGroups",
                newName: "OfferId");

            migrationBuilder.RenameIndex(
                name: "IX_OfferConditionGroups_OfferRuleId",
                table: "OfferConditionGroups",
                newName: "IX_OfferConditionGroups_OfferId");

            migrationBuilder.AddForeignKey(
                name: "FK_OfferConditionGroups_Offers_OfferId",
                table: "OfferConditionGroups",
                column: "OfferId",
                principalTable: "Offers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OfferConditionGroups_Offers_OfferId",
                table: "OfferConditionGroups");

            migrationBuilder.RenameColumn(
                name: "OfferId",
                table: "OfferConditionGroups",
                newName: "OfferRuleId");

            migrationBuilder.RenameIndex(
                name: "IX_OfferConditionGroups_OfferId",
                table: "OfferConditionGroups",
                newName: "IX_OfferConditionGroups_OfferRuleId");

            migrationBuilder.CreateTable(
                name: "OfferRules",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    OfferId = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OfferRules", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OfferRules_Offers_OfferId",
                        column: x => x.OfferId,
                        principalTable: "Offers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OfferRules_OfferId",
                table: "OfferRules",
                column: "OfferId");

            migrationBuilder.AddForeignKey(
                name: "FK_OfferConditionGroups_OfferRules_OfferRuleId",
                table: "OfferConditionGroups",
                column: "OfferRuleId",
                principalTable: "OfferRules",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
