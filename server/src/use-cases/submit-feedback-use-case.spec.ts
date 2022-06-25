import { SubmitFeedbackUseCase } from './submit-feedback-use-case';

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedbackUseCase = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe('submit feedback', () => {
  it('should be able to submit a feedback', async () => {
    await expect(submitFeedbackUseCase.execute({
      type: 'BUG',
      comment: 'Example comment!',
      screenshot: 'data:image/png;base64,test.jpg',
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should not be able to submit feedback without type', async () => {
    await expect(submitFeedbackUseCase.execute({
      type: '',
      comment: 'Example comment!',
      screenshot: 'data:image/png;base64,test.jpg',
    })).rejects.toThrow();
  });

  it('should not be able to submit feedback without comment', async () => {
    await expect(submitFeedbackUseCase.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64,test.jpg',
    })).rejects.toThrow();
  });

  it('should not be able to submit feedback with invalid screenshot format', async () => {
    await expect(submitFeedbackUseCase.execute({
      type: 'BUG',
      comment: 'Example comment!',
      screenshot: 'test.jpg',
    })).rejects.toThrow();
  });
});