import { useEffect, useRef, useState } from "react";
import Plus from "assets/icons/plus.svg";

type ImageUploadProps = {
  className?: string;
};

export default function ImageUpload(props: ImageUploadProps) {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (!image) {
      setPreview("");
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  const hiddenFileInput = useRef<any>(null);

  const handleClick = () => {
    if (hiddenFileInput.current) hiddenFileInput.current.click();
  };

  const handleChange = (file: File | null) => {
    if (file) {
      setImage(file);
    }
  };

  return (
    <>
      <button
        className={`rounded-[34px] bg-tertiary-gray h-40 hover:opacity-60 ${props.className}`}
        onClick={handleClick}
      >
        {image ? (
          <img
            className="rounded-[34px] self-center"
            src={preview}
            alt="preview"
            height="160px"
          />
        ) : (
          <div className="flex flex-col justify-center items-center">
            <span className="mb-6 text-primary-gray font-xl font-bold">
              Adicionar foto
            </span>
            <img src={Plus} alt="add" height={160} />
          </div>
        )}
      </button>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleChange(e.target.files?.item(0) ?? null)}
        ref={hiddenFileInput}
        style={{ display: "none" }}
      />
    </>
  );
}
