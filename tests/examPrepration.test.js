import { screen, fireEvent } from '@testing-library/dom';
import '@testing-library/jest-dom';
import i18next from 'i18next';
import { ExamPreparation } from '../src/ExamPrepreation/examPreprationScreen';
import { showTab } from '../src/ExamPrepreation/examPrechecks';
import { registerEvent } from '../src/utils/functions';

jest.mock('../src/ExamPrepreation/examPrechecks', () => ({
    showTab: jest.fn(),
}));

jest.mock('../src/utils/functions', () => ({
    registerEvent: jest.fn(),
}));

jest.mock('i18next', () => ({
  t: (key) => {
    const translations = {
      'exam_preparation': 'Exam Preparation',
      'icc_msg': 'ICC Message',
      'continue': 'Continue',
    };
    return translations[key] || key;
  },
  changeLanguage: jest.fn(),
  on: jest.fn(),
}));

describe('ExamPreparation', () => {
  beforeEach(() => {
      document.body.innerHTML = '';
      jest.clearAllMocks();
  });

  it('should render content correctly', async () => {
    const tabContent = document.createElement('div');
    tabContent.className = 'tab-content';
    tabContent.id = 'ExamPreparation';
    document.body.appendChild(tabContent);

    await ExamPreparation(tabContent);

    // Check header image
    const headerImg = screen.getByAltText('header-img');
    expect(headerImg).toBeInTheDocument();
    expect(headerImg.src).toContain('test-file-stub');

    // Check title
    const title = screen.getByText('Exam Preparation');
    expect(title).toBeInTheDocument();

    // Check message label
    const msgLabel = screen.getByText('ICC Message');
    expect(msgLabel).toBeInTheDocument();

    // Check continue button
    const continueButton = screen.getByRole('button', { name: /continue/i });
    expect(continueButton).toBeInTheDocument();
    expect(continueButton).toHaveClass('orange-filled-btn');
  });

  it('should handle continue button click', async () => {
      const tabContent = document.createElement('div');
      tabContent.className = 'tab-content';
      tabContent.id = 'ExamPreparation';
      document.body.appendChild(tabContent);

      await ExamPreparation(tabContent);

      const continueButton = screen.getByRole('button', { name: /continue/i });
      fireEvent.click(continueButton);

      expect(registerEvent).toHaveBeenCalledWith({
          eventType: 'success',
          notify: false,
          eventName: 'terms_and_conditions_read',
          eventValue: expect.any(String),
      });
      expect(showTab).toHaveBeenCalledWith('runSystemDiagnostics');
  });

  it('should update content on language change', async () => {
      const tabContent = document.createElement('div');
      tabContent.className = 'tab-content';
      tabContent.id = 'ExamPreparation';
      document.body.appendChild(tabContent);

      await ExamPreparation(tabContent);

      i18next.changeLanguage('fr');

      expect(screen.getByText('Exam Preparation')).toBeInTheDocument();
      expect(screen.getByText('ICC Message')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /continue/i })).toBeInTheDocument();
  });

  it('should not render if tabContent is not defined', async () => {
      console.error = jest.fn();

      await ExamPreparation(null);

      expect(console.error).toHaveBeenCalledWith('tabContent is not defined or is not a valid DOM element');
      expect(document.body.innerHTML).toBe('');
  });
});