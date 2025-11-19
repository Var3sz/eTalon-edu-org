// app/(main)/(tabs)/courses.tsx
import { View, Text, StyleSheet, FlatList, Modal, Button } from 'react-native';
import { coursesMock } from '../../../mock/courses';
import { Ionicons } from '@expo/vector-icons';
import CourseListItem from '../../../components/courses/course-list-item';
import { useState } from 'react';

const data = [
  { id: '1', name: 'Apple' },
  { id: '2', name: 'Banana' },
  { id: '3', name: 'Orange' },
  { id: '4', name: 'Orange' },
];

export default function CoursesScreen() {
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handlePressCourse = (course: any) => {
    setSelectedCourse(course);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedCourse(null);
  };

  const handlePositiveEvent = () => {};

  return (
    <>
      <FlatList
        data={coursesMock}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CourseListItem course={item} onPress={() => handlePressCourse(item)} />}
      />

      <Modal visible={modalVisible} transparent animationType='fade' onRequestClose={handleCloseModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedCourse && (
              <>
                <Text style={styles.modalTitle}>{selectedCourse.courseId}</Text>
                <Text style={styles.modalText}>Csoport: {selectedCourse.group}</Text>
                <Text style={styles.modalText}>Lezárt: {selectedCourse.closed ? 'Igen' : 'Nem'}</Text>

                <View style={styles.modalButton}>
                  <Button title='Bezárás' onPress={handleCloseModal} />
                  <Button
                    title='Megnyitás'
                    onPress={handlePositiveEvent} // <-- Pozitív esemény
                    color='#4CAF50'
                  />
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    minHeight: 200,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  modalText: {
    fontSize: 15,
    marginBottom: 4,
  },
  modalButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 4,
    marginTop: 16,
  },
});
