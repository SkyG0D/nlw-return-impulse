import { FormEvent, useEffect, useState } from "react";
import { ArrowLeft } from "phosphor-react";

import { CloseButton } from "../../CloseButton";
import { ScreenshotButton } from "../ScreenshotButton";

import { FeedbackType, feedbackTypes } from "..";

type FeedbackContentStepProps = {
  feedbackType: FeedbackType;
  onFeedbackRestartRequested: () => void;
  onFeedbackSent: () => void;
};

const feedbackTypesPlaceholders = {
  BUG: "Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo...",
  IDEA: "Teve uma ideia de melhoria ou de nova funcionalidade? Conta pra gente!",
  OTHER: "Queremos te ouvir. O que você gostaria de nos dizer? ",
};

export function FeedbackContentStep({
  feedbackType,
  onFeedbackRestartRequested,
  onFeedbackSent,
}: FeedbackContentStepProps) {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState("");

  const { title, image } = feedbackTypes[feedbackType];
  const placeholder = feedbackTypesPlaceholders[feedbackType];

  useEffect(() => {
    console.log(comment);
  }, [comment]);

  function handleSubmitFeedback(event: FormEvent) {
    event.preventDefault();

    console.log({ comment, screenshot });

    onFeedbackSent();
  }

  return (
    <>
      <header>
        <button
          type="button"
          onClick={onFeedbackRestartRequested}
          className="absolute top-5 left-5 text-zinc-400 hover:text-zinc-100"
        >
          <ArrowLeft weight="bold" className="w-4 h-4" />
        </button>

        <span className="text-xl leading-6 flex items-center gap-2">
          <img src={image.source} alt={image.alt} className="w-6 h-6" />
          {title}
        </span>

        <CloseButton />
      </header>

      <form onSubmit={handleSubmitFeedback} className="my-4 w-full">
        <textarea
          placeholder={placeholder}
          onChange={(event) => setComment(event.target.value)}
          value={comment}
          className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md resize-none focus:outline-none focus:border-brand-500 focus:ring-brand-500 focus:ring-1 scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent"
        />

        <footer className="flex gap-2 mt-2">
          <ScreenshotButton
            screenshot={screenshot}
            onTakeScreenshotFinish={setScreenshot}
          />

          <button
            type="submit"
            disabled={!comment}
            className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm transition-colors hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 disabled:opacity-50 disabled:hover:bg-brand-500"
          >
            Enviar feedback
          </button>
        </footer>
      </form>
    </>
  );
}
