from skimage.transform import rescale, resize, downscale_local_mean
from skimage import io
from PIL import Image
from matplotlib import pyplot as plt
from io import StringIO
from collections import defaultdict
import zipfile
import tensorflow as tf
import tarfile
import six.moves.urllib as urllib
import numpy as np
import glob
import os
from object_detection.utils import ops as utils_ops
from object_detection.utils import label_map_util
from object_detection.utils import visualization_utils as vis_util
import sys
sys.path.append(
    "/home/stas/ml/env/lib/python3.6/site-packages/tensorflow/models/research/object_detection")


# This is needed since the notebook is stored in the object_detection folder.


output_directory = '/home/stas/ml/window_replacer_new/training'
pb_fname = os.path.join(os.path.abspath(
    output_directory), "frozen_inference_graph.pb")
PATH_TO_CKPT = pb_fname

label_map_pbtxt_fname = '/home/stas/ml/window_replacer_new/training/label_map.pbtxt'
PATH_TO_LABELS = label_map_pbtxt_fname

num_classes = 1

PATH_TO_TEST_IMAGES_DIR = os.path.join(
    "/home/stas/ml/window_replacer_new/data/images", "test1")

TEST_IMAGE_PATHS = glob.glob(os.path.join(PATH_TO_TEST_IMAGES_DIR, "*.*"))

detection_graph = tf.Graph()
with detection_graph.as_default():
    od_graph_def = tf.GraphDef()
    with tf.gfile.GFile(PATH_TO_CKPT, 'rb') as fid:
        serialized_graph = fid.read()
        od_graph_def.ParseFromString(serialized_graph)
        tf.import_graph_def(od_graph_def, name='')


label_map = label_map_util.load_labelmap(PATH_TO_LABELS)
categories = label_map_util.convert_label_map_to_categories(
    label_map, max_num_classes=num_classes, use_display_name=True)
category_index = label_map_util.create_category_index(categories)


def load_image_into_numpy_array(image):
    (im_width, im_height) = image.size
    return np.array(image.getdata()).reshape(
        (im_height, im_width, 3)).astype(np.uint8)


# Size, in inches, of the output images.
IMAGE_SIZE = (12, 8)


def run_inference_for_single_image(image, graph):
    with graph.as_default():
        with tf.Session() as sess:
            # Get handles to input and output tensors
            ops = tf.get_default_graph().get_operations()
            all_tensor_names = {
                output.name for op in ops for output in op.outputs}
            tensor_dict = {}
            for key in [
                'num_detections', 'detection_boxes', 'detection_scores',
                'detection_classes', 'detection_masks'
            ]:
                tensor_name = key + ':0'
                if tensor_name in all_tensor_names:
                    tensor_dict[key] = tf.get_default_graph().get_tensor_by_name(
                        tensor_name)
            if 'detection_masks' in tensor_dict:
                # The following processing is only for single image
                detection_boxes = tf.squeeze(
                    tensor_dict['detection_boxes'], [0])
                detection_masks = tf.squeeze(
                    tensor_dict['detection_masks'], [0])
                # Reframe is required to translate mask from box coordinates to image coordinates and fit the image size.
                real_num_detection = tf.cast(
                    tensor_dict['num_detections'][0], tf.int32)
                detection_boxes = tf.slice(detection_boxes, [0, 0], [
                                           real_num_detection, -1])
                detection_masks = tf.slice(detection_masks, [0, 0, 0], [
                                           real_num_detection, -1, -1])
                detection_masks_reframed = utils_ops.reframe_box_masks_to_image_masks(
                    detection_masks, detection_boxes, image.shape[0], image.shape[1])
                detection_masks_reframed = tf.cast(
                    tf.greater(detection_masks_reframed, 0.5), tf.uint8)
                # Follow the convention by adding back the batch dimension
                tensor_dict['detection_masks'] = tf.expand_dims(
                    detection_masks_reframed, 0)
            image_tensor = tf.get_default_graph().get_tensor_by_name('image_tensor:0')

            # Run inference
            output_dict = sess.run(tensor_dict,
                                   feed_dict={image_tensor: np.expand_dims(image, 0)})

            # all outputs are float32 numpy arrays, so convert types as appropriate
            output_dict['num_detections'] = int(
                output_dict['num_detections'][0])
            output_dict['detection_classes'] = output_dict[
                'detection_classes'][0].astype(np.uint8)
            output_dict['detection_boxes'] = output_dict['detection_boxes'][0]
            output_dict['detection_scores'] = output_dict['detection_scores'][0]
            if 'detection_masks' in output_dict:
                output_dict['detection_masks'] = output_dict['detection_masks'][0]
    return output_dict


def get_window_coords():
    image_path = '/home/stas/ml/window_replacer_new/data/images/test1/9.jpg'
    print(image_path)
    image = Image.open(image_path)
    image_np = load_image_into_numpy_array(image)
    # Actual detection.
    output_dict = run_inference_for_single_image(image_np, detection_graph)
    print(output_dict['detection_scores'][0],
          output_dict['detection_boxes'][0])

    img_shape = image_np.shape
    coord_list = []
    for i, score in enumerate(output_dict['detection_scores']):
        if score >= 0.8:
            coords = (round(output_dict['detection_boxes'][i][0] * img_shape[0]), round(output_dict['detection_boxes'][i][1] * img_shape[1]),
                      round(output_dict['detection_boxes'][i][2] * img_shape[0]), round(output_dict['detection_boxes'][i][3] * img_shape[1]))
            coord_list.append(coords)

    return coord_list

    #     image_np[int(coords[0]):int(coords[2]),int(coords[1]):int(coords[3])] = window_img.reshape(147,157,3)

    #     io.imshow(image_np)
