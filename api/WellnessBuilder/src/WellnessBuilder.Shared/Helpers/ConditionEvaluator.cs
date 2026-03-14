using System.Text.Json;
using WellnessBuilder.Shared.Enums;

namespace WellnessBuilder.Shared.Helpers;

public static class ConditionEvaluator
{
    public static bool Evaluate(
        string attributeKey,
        ConditionOperator op,
        string conditionValue,
        Dictionary<string, string> context)
    {
        if (!context.TryGetValue(attributeKey, out var contextValue))
            return false;

        return op switch
        {
            ConditionOperator.Eq => contextValue == conditionValue,
            ConditionOperator.NotEq => contextValue != conditionValue,
            ConditionOperator.In => JsonSerializer
                .Deserialize<List<string>>(conditionValue)!
                .Contains(contextValue),
            ConditionOperator.Gt => decimal.TryParse(contextValue, out var cv) &&
                                    decimal.TryParse(conditionValue, out var condV) &&
                                    cv >= condV,
            ConditionOperator.Lt => decimal.TryParse(contextValue, out var cv) &&
                                    decimal.TryParse(conditionValue, out var condV) &&
                                    cv <= condV,
            _ => false
        };
    }
}