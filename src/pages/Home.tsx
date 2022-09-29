import React, { useState, useEffect } from 'react';
import {
     Text,
     StyleSheet,
     SafeAreaView,
     TextInput,
     Platform,
     FlatList,
} from 'react-native';
import { Button } from '../components/Button';
import { SkillCard } from '../components/SkillCard';

interface SkillData {
    id: string;
    name: string;
}

export function Home() {
  const [newSkill, setNewSkill] = useState('');
  const [mySkills, setMySkills] = useState<SkillData[]>([]);
  const [greetings, setGreetings] = useState('');

  function handleAddSkill() {
    const data = {
        id: String(new Date().getTime()),
        name: newSkill,
    }
    setMySkills([...mySkills, data]);
  }

  function handleRemoveSkill(id: string) {
    setMySkills(oldState => oldState.filter(
        skill => skill.id !== id
    ))
  }

  useEffect(() => {
    const currentTime = new Date().getHours();

    if (currentTime >= 6 && currentTime < 12) {
        setGreetings('Good morning');
    } else if (currentTime >= 12 && currentTime < 18) {
        setGreetings('Good afternoon');
    } else {
        setGreetings('Good night');
    }
  });

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.title}>
            Welcome, Bruno
        </Text>
        <Text style={styles.greetings}>
            {greetings}
        </Text>

        <TextInput
            style={styles.input}
            placeholder="New skill"
            placeholderTextColor="#555"
            onChangeText={setNewSkill}
        />

        <Button
         onPress={handleAddSkill}
         title="Add"
        />

        <Text style={[styles.title, {marginVertical: 50}]}>
           My skills
        </Text>

        <FlatList 
            data={mySkills}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => (
                <SkillCard
                    skill={item.name}
                    onLongPress={() => handleRemoveSkill(item.id)}
                />
            )}
        />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121015',
        paddingHorizontal: 30,
        paddingVertical: 30
    },
    title: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: 'bold',
    },
    greetings: {
        fontSize: 14,
        color: '#CCC',
    },
    input: {
        backgroundColor: '#1F1E25',
        color: '#FFF',
        fontSize: 18,
        padding: Platform.OS === 'ios' ? 15 : 10,
        marginTop: 30,
        borderRadius: 7
    }
});