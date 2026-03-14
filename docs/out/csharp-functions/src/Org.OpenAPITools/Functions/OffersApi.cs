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
    public partial class OffersApi
    { 
        [FunctionName("OffersApi_ApiV1FlowsFlowIdOffersGet")]
        public async Task<ActionResult<ApiV1FlowsFlowIdOffersGet200Response>> _ApiV1FlowsFlowIdOffersGet([HttpTrigger(AuthorizationLevel.Anonymous, "Get", Route = "api/v1/flows/{flowId}/offers")]HttpRequest req, ExecutionContext context, [RegularExpression("^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$")]string flowId)
        {
            var method = this.GetType().GetMethod("ApiV1FlowsFlowIdOffersGet");
            return method != null
                ? (await ((Task<ApiV1FlowsFlowIdOffersGet200Response>)method.Invoke(this, new object[] { req, context, flowId })).ConfigureAwait(false))
                : new StatusCodeResult((int)HttpStatusCode.NotImplemented);
        }

        [FunctionName("OffersApi_ApiV1FlowsFlowIdOffersPost")]
        public async Task<ActionResult<Offers>> _ApiV1FlowsFlowIdOffersPost([HttpTrigger(AuthorizationLevel.Anonymous, "Post", Route = "api/v1/flows/{flowId}/offers")]HttpRequest req, ExecutionContext context, [RegularExpression("^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$")]string flowId)
        {
            var method = this.GetType().GetMethod("ApiV1FlowsFlowIdOffersPost");
            return method != null
                ? (await ((Task<Offers>)method.Invoke(this, new object[] { req, context, flowId })).ConfigureAwait(false))
                : new StatusCodeResult((int)HttpStatusCode.NotImplemented);
        }

        [FunctionName("OffersApi_ApiV1OffersOfferIdConditionGroupsGet")]
        public async Task<ActionResult<ApiV1OptionsOptionIdConditionGroupsGet200Response>> _ApiV1OffersOfferIdConditionGroupsGet([HttpTrigger(AuthorizationLevel.Anonymous, "Get", Route = "api/v1/offers/{offerId}/condition-groups")]HttpRequest req, ExecutionContext context, [RegularExpression("^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$")]string offerId)
        {
            var method = this.GetType().GetMethod("ApiV1OffersOfferIdConditionGroupsGet");
            return method != null
                ? (await ((Task<ApiV1OptionsOptionIdConditionGroupsGet200Response>)method.Invoke(this, new object[] { req, context, offerId })).ConfigureAwait(false))
                : new StatusCodeResult((int)HttpStatusCode.NotImplemented);
        }

        [FunctionName("OffersApi_ApiV1OffersOfferIdConditionGroupsPost")]
        public async Task<ActionResult<ConditionGroups>> _ApiV1OffersOfferIdConditionGroupsPost([HttpTrigger(AuthorizationLevel.Anonymous, "Post", Route = "api/v1/offers/{offerId}/condition-groups")]HttpRequest req, ExecutionContext context, [RegularExpression("^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$")]string offerId)
        {
            var method = this.GetType().GetMethod("ApiV1OffersOfferIdConditionGroupsPost");
            return method != null
                ? (await ((Task<ConditionGroups>)method.Invoke(this, new object[] { req, context, offerId })).ConfigureAwait(false))
                : new StatusCodeResult((int)HttpStatusCode.NotImplemented);
        }

        [FunctionName("OffersApi_ApiV1OffersOfferIdDelete")]
        public async Task<ActionResult<>> _ApiV1OffersOfferIdDelete([HttpTrigger(AuthorizationLevel.Anonymous, "Delete", Route = "api/v1/offers/{offerId}")]HttpRequest req, ExecutionContext context, [RegularExpression("^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$")]string offerId)
        {
            var method = this.GetType().GetMethod("ApiV1OffersOfferIdDelete");
            return method != null
                ? (await ((Task<>)method.Invoke(this, new object[] { req, context, offerId })).ConfigureAwait(false))
                : new StatusCodeResult((int)HttpStatusCode.NotImplemented);
        }

        [FunctionName("OffersApi_ApiV1OffersOfferIdGet")]
        public async Task<ActionResult<Offers>> _ApiV1OffersOfferIdGet([HttpTrigger(AuthorizationLevel.Anonymous, "Get", Route = "api/v1/offers/{offerId}")]HttpRequest req, ExecutionContext context, [RegularExpression("^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$")]string offerId)
        {
            var method = this.GetType().GetMethod("ApiV1OffersOfferIdGet");
            return method != null
                ? (await ((Task<Offers>)method.Invoke(this, new object[] { req, context, offerId })).ConfigureAwait(false))
                : new StatusCodeResult((int)HttpStatusCode.NotImplemented);
        }

        [FunctionName("OffersApi_ApiV1OffersOfferIdPatch")]
        public async Task<ActionResult<Offers>> _ApiV1OffersOfferIdPatch([HttpTrigger(AuthorizationLevel.Anonymous, "Patch", Route = "api/v1/offers/{offerId}")]HttpRequest req, ExecutionContext context, [RegularExpression("^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$")]string offerId)
        {
            var method = this.GetType().GetMethod("ApiV1OffersOfferIdPatch");
            return method != null
                ? (await ((Task<Offers>)method.Invoke(this, new object[] { req, context, offerId })).ConfigureAwait(false))
                : new StatusCodeResult((int)HttpStatusCode.NotImplemented);
        }
    }
}
