"use client";

import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/lib/api";

export default function Copilot() {

  const [question,setQuestion]=useState("");
  const [answer,setAnswer]=useState("");

  async function ask() {

    const res = await axios.post(
      `${BASE_URL}/copilot`,
      {
        question
      }
    );

    setAnswer(res.data.answer);
  }

  return (

    <div className="space-y-4">

      <textarea
        className="w-full p-3 bg-zinc-900 rounded"
        value={question}
        onChange={(e)=>setQuestion(e.target.value)}
      />

      <button
        onClick={ask}
        className="bg-blue-500 px-4 py-2 rounded"
      >
        Ask
      </button>

      <div className="bg-zinc-900 p-4 rounded">
        {answer}
      </div>

    </div>

  );
}