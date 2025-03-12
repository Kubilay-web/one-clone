import React from "react";
import moment from "moment";
import { dateHandler } from "../../../utils/date";
import { useDispatch, useSelector } from "react-redux";
import { open_create_conversation } from "../../../reducers/chatSlice";
import { getConversationId } from "../../../utils/chat";

const Conversation = ({ convo }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((user) => ({ ...user }));

  const token = user?.token;
  const values = {
    receiver_id: getConversationId(user, convo.users),
    token,
  };

  const openConversation = () => {
    dispatch(open_create_conversation(values));
  };

  return (
    <li
      onClick={() => openConversation()}
      className="list-none h-[72px] w-full dark:bg-dark_bg_1 hover:dark:bg-dark_bg_2 cursor-pointer dark:text-dark_text_1 px-[10px]"
    >
      <div className="relative w-full flex items-center justify-between py-[10px]">
        <div className="flex items-center gap-x-3">
          <div className="relative min-w-[50px] max-w-[50px] h-[50px] rounded-full">
            <img
              src={convo.picture}
              alt={convo.username}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="w-full flex flex-col">
            <h1 className="font-bold flex items-center gap-x-2">
              {convo.username}
            </h1>
            <div>
              <div className="flex items-center gap-x-1 dark:text-dark_text_2">
                <div className="flex-1 items-center gap-x-1 dark:text-dark_text_2">
                  <p>
                    {convo.latestMessage?.message.length > 25
                      ? `${convo.latestMessage?.message.substring(0, 25)}...`
                      : convo.latestMessage?.message}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Right */}

        <div className="flex flex-col gap-y-4 items-end text-xs">
          <span className="dark:text-dark_text_2">
            {/* {dateHandler(convo.latestMessage?.createdAt)} */}
            {convo.latestMessage?.createdAt
              ? dateHandler(convo.latestMessage?.createdAt)
              : ""}
          </span>
          {/* <span>{moment(convo.latestMessage?.createdAt).fromNow(true)}</span> */}
        </div>
      </div>
      <div className="ml-16 border-b dark:border-b-dark_border_1"></div>
    </li>
  );
};

export default Conversation;
