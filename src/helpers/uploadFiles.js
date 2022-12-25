export const filesUpload = async (file) => {

  if(!file) throw new Error('No file to upload')
  const cloudURL =  'https://api.cloudinary.com/v1_1/estebansl/upload'

  const filesData = new FormData()
  filesData.append('upload_preset', 'journal-app')
  filesData.append('file', file)

  try {
    const response = await fetch( cloudURL, {
      method: 'POST',
      body: filesData,
    })
    if (!response.ok) throw new Error('Error uploading file')

    const cloudResponse = await response.json()

    return cloudResponse.secure_url

  } catch (error) {
    throw new Error('Error uploading files')
  }
}