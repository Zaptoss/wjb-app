using WellnessBuilder.Shared.Contracts.Sessions;

namespace WellnessBuilder.User.Api.IServices;

public interface ISessionService
{
    Task<CreateSessionResponse> CreateAsync();
    Task<SessionStepResponse> SubmitAnswerAsync(Guid sessionId, AnswerRequest request);
}