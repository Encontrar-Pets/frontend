import { useEffect, useRef, useState } from "react";
import imageCompression from "browser-image-compression";
import Plus from "assets/icons/plus.svg";

type ImageUploadProps = {
  className?: string;
  onChange: (baseImage: string) => void;
  placeholder?: string;
};

export default function ImageUpload(props: ImageUploadProps) {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState(false);

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

  const getBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve) => {
      let reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        resolve(reader.result);
      };
    });
  };

  const handleChange = async (file: File | null) => {
    try {
      if (!file) throw new Error("No file found");

      const compressedFile = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
      });

      const baseImage = await getBase64(compressedFile);

      if (!baseImage) throw new Error("Error on get base64 image");

      props.onChange(baseImage.toString());
      setImage(compressedFile);
    } catch (error) {
      setError(true);
    }
  };

  const handleClick = () => {
    setError(false);
    if (hiddenFileInput.current) hiddenFileInput.current.click();
  };

  return (
    <>
      <button
        className={`rounded-[34px] bg-tertiary-gray h-40 hover:opacity-60 ${props.className}`}
        onClick={handleClick}
      >
        {image ? (
          <div className="h-[160px]">
            <img
              className="rounded-[34px] self-center"
              src={preview}
              alt="preview"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <span className="mb-6 text-primary-gray font-xl font-bold">
              {props.placeholder ?? "Adicionar foto"}
            </span>
            <img src={Plus} alt="add" />
          </div>
        )}
      </button>
      {error && (
        <span className="ml-4 mt-2 text-primary-red text-xs">
          Erro ao carregar a foto. Tente novamente ou escolha outra imagem!
        </span>
      )}
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
