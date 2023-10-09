import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "@/lib/axios";
import { type FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";

interface UploadFormProps {
  dialog?: {
    open: boolean;
    setOpen: (value: boolean) => void;
  };
  afterUploaded?: (value: string) => void;
}

export default function UploadForm(props: UploadFormProps) {
  const { dialog, afterUploaded } = props;
  const { t } = useTranslation();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleUpload = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);

    const res = await axios.post("api/uploads", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    if (res.status == 201) {
      afterUploaded(res.data.data);
      dialog.setOpen(false);
    }
  };

  return (
    <form
      onSubmit={(e) => handleUpload(e)}
      encType="multipart/form-data"
      className="space-y-2"
    >
      <Input
        type="file"
        onChange={(e) => setSelectedFile(e.target.files[0])}
        onClick={() => setSelectedFile(null)}
        accept="image/*"
      />
      {selectedFile && (
        <div className="border p-4 rounded-md">
          <img
            src={URL.createObjectURL(selectedFile)}
            className="w-full h-80 object-contain"
          />
        </div>
      )}
      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={() => dialog.setOpen(false)}>
          {t("common.cancel")}
        </Button>
        <Button disabled={!selectedFile}>{t("common.upload")}</Button>
      </div>
    </form>
  );
}
