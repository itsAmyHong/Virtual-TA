# -*- coding: utf-8 -*-
"""sentenceclass.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1pma9y0tLZO-nObSuhtDCVcOpeQW-m2RZ
"""

import pandas as pd


def classify(sentence):

    keywords_syllabus = ["syllabus", "schedule", "office hours", "grade structure"]
    keywords_math = ["O(n)", "algorithm time complexity", "mathematics"]
    keywords_general = ["merge sort", "binary search tree", "algorithm analysis"]


    sentence = sentence.lower()


    if any(keyword in sentence for keyword in keywords_syllabus):
        return "Syllabus-related"
    elif any(keyword in sentence for keyword in keywords_math):
        return "Math-related"
    elif any(keyword in sentence for keyword in keywords_general):
        return "General"

    return "Other"

input_data = pd.read_csv("VirtualTADataSet.csv", header=None)

categories = []

for sentence in input_data[1]:
    category = classify(sentence)
    categories.append(category)

input_data["Category"] = categories

input_data.to_csv("classified_data.csv", index=False, header=["Number", "Sentence", "Category"])
print(input_data)