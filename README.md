# Compress Images

GitHub action to lint markdown lists and warn when list items are not alphabetically ordered

Uses the [imagemin CLI](https://github.com/imagemin/imagemin-cli) to compress images from the input directory and then places the compressed images in the output directory. For JPG it uses [mozjpeg](https://github.com/mozilla/mozjpeg), PNG it uses [pngquant](https://github.com/kornelski/pngquant) and for GIFs it uses [gifsicle](https://www.lcdf.org/gifsicle/) compressors.

## Inputs

While all the input parameters are optional, feel free to supply them in case you need to customize the values. See example usage below to know how to customize these values. 

| **Parameter**           | **Description**                                                                             | **Default value** |
| ----------------------- | ------------------------------------------------------------------------------------------- | ----------------- |
| input-directory         | Directory that contains uncompressed images.                                                | images            |
| output-directory        | Directory that will contain the compressed images                                           | dist              |
| jpg-compression-quality | Set the level of compression for JPG image files. Value should be in the range of 0 to 100. | 40                |
| png-compression-quality | Set the level of compression for PNG image files. Value should be in the range of 0 to 1.   | 0.4               |
| gif-compression-quality | Set the level of compression for GIF image files. Value should be in the range of 1 to 3.   | 2                 |

## Outputs

The compressed images will be sent to the supplied `output-directory`. Use the `actions/upload-artifact` to make the compressed images available as an artifact, or commit these files into the repository if that better suits your requirements.  

## Example usage

This is what using this action might look like. You can skip the optional parameters and/or customize the values as per the range described above. 

```yaml
uses: clydedz/compress-images@v1
with:
  input-directory: images
  output-directory: dist
  jpg-compression-quality: 40
  png-compression-quality: 0.4
  gif-compression-quality: 2
```