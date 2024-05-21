import { useCallback, useEffect, useRef, useState } from "react";
import imageCompression from "browser-image-compression";
import Plus from "assets/icons/plus.svg";
import Camera from "assets/icons/camera.svg";
import Webcam from "react-webcam";

type ImageUploadProps = {
  className?: string;
  onChange: (baseImage: string) => void;
  placeholder?: string;
};

export default function ImageUpload(props: ImageUploadProps) {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState(false);
  const [action, setAction] = useState<
    "UPLOAD" | "SCREENSHOT" | "OPEN_CAMERA"
  >();

  useEffect(() => {
    if (!image) {
      setPreview("");
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  const webcamRef = useRef<any>(null);
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

      setImage(compressedFile);
      setAction("UPLOAD");

      props.onChange(baseImage.toString());
    } catch (error) {
      setError(true);
    }
  };

  const handleClick = () => {
    setError(false);
    if (hiddenFileInput.current) hiddenFileInput.current.click();
  };

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setPreview(imageSrc);
      setAction("SCREENSHOT");
      //TODO compress

      props.onChange(imageSrc.toString());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webcamRef]);

  const componentWithAction = () => {
    if (action === "OPEN_CAMERA")
      return (
        <Webcam
          className="rounded-[34px] h-full w-full"
          screenshotFormat="image/jpeg"
          ref={webcamRef}
          onClick={capture}
        />
      );

    if (image || preview) {
      return (
        <div style={{ width: "100%", height: "100%" }}>
          <img
            className="rounded-t-[34px] self-center"
            src={preview}
            alt="preview"
            style={{ width: "100%", height: "80%" }}
          />
          <div
            className="flex bg-tertiary-gray justify-center rounded-b-[34px]"
            style={{ height: "20%" }}
          >
            {action === "UPLOAD" ? (
              <button
                className="flex flex-row items-center"
                onClick={handleClick}
              >
                <span className="text-primary-gray font-sm font-bold mr-2">
                  Selecionar outra foto
                </span>
                <img src={Plus} alt="add" width="14" />
              </button>
            ) : (
              <button
                className="flex flex-row items-center"
                onClick={handleOpenCamera}
              >
                <span className="text-primary-gray font-sm font-bold mr-2">
                  Tirar outra foto
                </span>
                <img src={Camera} alt="camera" width="16" />
              </button>
            )}
          </div>
        </div>
      );
    }
  };

  const handleOpenCamera = () => {
    setAction("OPEN_CAMERA");
  };

  return (
    <>
      <div
        className={`rounded-[34px] bg-tertiary-gray h-40 content-center ${props.className}`}
      >
        {action ? (
          componentWithAction()
        ) : (
          <div className="flex flex-col">
            <button
              className="flex flex-row justify-center"
              onClick={handleOpenCamera}
            >
              <span className="mb-6 mr-2 text-primary-gray font-xl font-bold">
                Tirar foto
              </span>
              <img src={Camera} alt="camera" width="24" />
            </button>
            <button
              className="flex flex-row justify-center"
              onClick={handleClick}
            >
              <span className="mb-6 mr-2 text-primary-gray font-xl font-bold">
                {props.placeholder ?? "Selecionar foto"}
              </span>
              <img src={Plus} alt="add" />
            </button>
          </div>
        )}
      </div>
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
