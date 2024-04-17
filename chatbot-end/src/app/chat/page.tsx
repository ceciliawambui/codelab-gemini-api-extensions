"use client";

import { useContext, useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  onSnapshot,
  CollectionReference,
  addDoc,
  query,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";
import ChatContainer, {
  ChatMessageData,
  ResponseData,
} from "@/components/chat-container";
import { FirebaseUserContext } from "@/lib/firebase-user";
import { prepareFollowUpPrompt, processResponse } from "@/lib/parser";

/**
 * A portal page with an ai chat.
 *
 * Using <ChatContainer>` component.
 *
 * Using `messages` (state variable) subscribed to Firestore collection `messages`
 * with `use` hook.
 */
const ChatPage = () => {
  const [messages, setMessages] = useState<ChatMessageData[]>([]);

  const user = useContext(FirebaseUserContext);
  const uid = user.currentUser?.uid;

  const messagesCollection = collection(
    getFirestore(),
    `users/${uid}/messages`
  ) as CollectionReference<ChatMessageData>;

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(messagesCollection, orderBy("createTime", "asc")),
      {},
      (snapshot) => {
        const messages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...processResponse(doc.data()),
        }));
        console.log(
          "Doc changes: ",
          snapshot
            .docChanges()
            .map((ch) => ({ type: ch.type, doc: ch.doc.data() }))
        );
        setMessages(messages);
      }
    );
    return unsubscribe;
  }, [uid]);

  const sendMessage = async (userMsg: string) => {
    // Display the user message immediately.
    setMessages((prev) => [...prev, { prompt: userMsg }]);
    // Send a message to Gemini Extension.
    const newMessageRef = await addDoc(messagesCollection, {
      prompt: prepareFollowUpPrompt(userMsg, messages),
    });
    console.log("New message added with ID: ", newMessageRef.id);
  };

  /** Delete a message pair. */
  const deleteMessage = async (messageId: string) => {
    await deleteDoc(doc(messagesCollection, messageId));
  };

  return (
    <ChatContainer
      messages={messages}
      onMessageSubmit={sendMessage}
      onMessageDelete={deleteMessage}
    ></ChatContainer>
  );
};

export default ChatPage;
