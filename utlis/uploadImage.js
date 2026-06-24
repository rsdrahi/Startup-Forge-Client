export const uploadImage = async (file) => {
  // console.log(file, "file receive");
    if (!file) return ""

    const formData = new FormData();
    formData.append("image", file)

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`, {
      method: "POST",
      body: formData,
    })
    const data = await res.json();

    if (data.success) {
      return data.data.url;
    }
    else {
      throw new Error(data.error?.message || "ImgBB upload failed");
    }
  }