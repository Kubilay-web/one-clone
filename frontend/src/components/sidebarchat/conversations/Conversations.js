import { useSelector } from "react-redux";
import Conversation from "./Conversation";

export default function Conversations() {
  const { conversations } = useSelector((state) => state.chat);
  console.log(conversations);

  return (
    <div className="convos scrollbar">
      <ul>
        {conversations &&
          conversations
            // .filter((c) => c.latestMessage)
            .map((convo) => {
              return <Conversation convo={convo} key={convo._id} />;
            })}
      </ul>
    </div>
  );
}
