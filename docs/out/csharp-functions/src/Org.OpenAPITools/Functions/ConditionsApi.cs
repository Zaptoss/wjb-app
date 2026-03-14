using System.IO;
using System.Net;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Extensions.OpenApi.Core.Attributes;
using Microsoft.Azure.WebJobs.Extensions.OpenApi.Core.Enums;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;
using Org.OpenAPITools.Models;

namespace Org.OpenAPITools.Functions
{ 
    public partial class ConditionsApi
    { 
        [FunctionName("ConditionsApi_ApiV1ConditionGroupsConditionGroupIdConditionsGet")]
        public async Task<ActionResult<ApiV1ConditionGroupsConditionGroupIdConditionsGet200Response>> _ApiV1ConditionGroupsConditionGroupIdConditionsGet([HttpTrigger(AuthorizationLevel.Anonymous, "Get", Route = "api/v1/condition-groups/{conditionGroupId}/conditions")]HttpRequest req, ExecutionContext context, [RegularExpression("^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$")]string conditionGroupId)
        {
            var method = this.GetType().GetMethod("ApiV1ConditionGroupsConditionGroupIdConditionsGet");
            return method != null
                ? (await ((Task<ApiV1ConditionGroupsConditionGroupIdConditionsGet200Response>)method.Invoke(this, new object[] { req, context, conditionGroupId })).ConfigureAwait(false))
                : new StatusCodeResult((int)HttpStatusCode.NotImplemented);
        }

        [FunctionName("ConditionsApi_ApiV1ConditionGroupsConditionGroupIdConditionsPost")]
        public async Task<ActionResult<Conditions>> _ApiV1ConditionGroupsConditionGroupIdConditionsPost([HttpTrigger(AuthorizationLevel.Anonymous, "Post", Route = "api/v1/condition-groups/{conditionGroupId}/conditions")]HttpRequest req, ExecutionContext context, [RegularExpression("^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$")]string conditionGroupId)
        {
            var method = this.GetType().GetMethod("ApiV1ConditionGroupsConditionGroupIdConditionsPost");
            return method != null
                ? (await ((Task<Conditions>)method.Invoke(this, new object[] { req, context, conditionGroupId })).ConfigureAwait(false))
                : new StatusCodeResult((int)HttpStatusCode.NotImplemented);
        }

        [FunctionName("ConditionsApi_ApiV1ConditionGroupsConditionGroupIdGet")]
        public async Task<ActionResult<ApiV1ConditionGroupsConditionGroupIdGet200Response>> _ApiV1ConditionGroupsConditionGroupIdGet([HttpTrigger(AuthorizationLevel.Anonymous, "Get", Route = "api/v1/condition-groups/{conditionGroupId}")]HttpRequest req, ExecutionContext context, [RegularExpression("^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$")]string conditionGroupId)
        {
            var method = this.GetType().GetMethod("ApiV1ConditionGroupsConditionGroupIdGet");
            return method != null
                ? (await ((Task<ApiV1ConditionGroupsConditionGroupIdGet200Response>)method.Invoke(this, new object[] { req, context, conditionGroupId })).ConfigureAwait(false))
                : new StatusCodeResult((int)HttpStatusCode.NotImplemented);
        }

        [FunctionName("ConditionsApi_ApiV1ConditionGroupsConditionGroupIdPost")]
        public async Task<ActionResult<Conditions>> _ApiV1ConditionGroupsConditionGroupIdPost([HttpTrigger(AuthorizationLevel.Anonymous, "Post", Route = "api/v1/condition-groups/{conditionGroupId}")]HttpRequest req, ExecutionContext context, [RegularExpression("^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$")]string conditionGroupId)
        {
            var method = this.GetType().GetMethod("ApiV1ConditionGroupsConditionGroupIdPost");
            return method != null
                ? (await ((Task<Conditions>)method.Invoke(this, new object[] { req, context, conditionGroupId })).ConfigureAwait(false))
                : new StatusCodeResult((int)HttpStatusCode.NotImplemented);
        }

        [FunctionName("ConditionsApi_ApiV1ConditionsConditionIdDelete")]
        public async Task<ActionResult<>> _ApiV1ConditionsConditionIdDelete([HttpTrigger(AuthorizationLevel.Anonymous, "Delete", Route = "api/v1/conditions/{conditionId}")]HttpRequest req, ExecutionContext context, [RegularExpression("^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$")]string conditionId)
        {
            var method = this.GetType().GetMethod("ApiV1ConditionsConditionIdDelete");
            return method != null
                ? (await ((Task<>)method.Invoke(this, new object[] { req, context, conditionId })).ConfigureAwait(false))
                : new StatusCodeResult((int)HttpStatusCode.NotImplemented);
        }

        [FunctionName("ConditionsApi_ApiV1ConditionsConditionIdGet")]
        public async Task<ActionResult<Conditions>> _ApiV1ConditionsConditionIdGet([HttpTrigger(AuthorizationLevel.Anonymous, "Get", Route = "api/v1/conditions/{conditionId}")]HttpRequest req, ExecutionContext context, [RegularExpression("^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$")]string conditionId)
        {
            var method = this.GetType().GetMethod("ApiV1ConditionsConditionIdGet");
            return method != null
                ? (await ((Task<Conditions>)method.Invoke(this, new object[] { req, context, conditionId })).ConfigureAwait(false))
                : new StatusCodeResult((int)HttpStatusCode.NotImplemented);
        }

        [FunctionName("ConditionsApi_ApiV1ConditionsConditionIdPatch")]
        public async Task<ActionResult<Conditions>> _ApiV1ConditionsConditionIdPatch([HttpTrigger(AuthorizationLevel.Anonymous, "Patch", Route = "api/v1/conditions/{conditionId}")]HttpRequest req, ExecutionContext context, [RegularExpression("^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$")]string conditionId)
        {
            var method = this.GetType().GetMethod("ApiV1ConditionsConditionIdPatch");
            return method != null
                ? (await ((Task<Conditions>)method.Invoke(this, new object[] { req, context, conditionId })).ConfigureAwait(false))
                : new StatusCodeResult((int)HttpStatusCode.NotImplemented);
        }
    }
}
