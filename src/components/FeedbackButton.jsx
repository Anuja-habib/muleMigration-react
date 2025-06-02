import { useNavigate } from 'react-router-dom';
import '../css/Feedback.css';
import { MdFeedback } from "react-icons/md";

const FeedbackButton = () => {
  const navigate = useNavigate();

  return (
    <div className='feedback-chatbot'>
    <div
      className='feedback-chatbot-button'
      onClick={() => navigate('/feedback')}
      title="Give Feedback"
      style={{ cursor: 'pointer' }}
    >
      <MdFeedback />
    </div>
    </div>
  );
};

export default FeedbackButton;