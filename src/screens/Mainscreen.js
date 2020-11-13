import React, { useCallback, useEffect, useLayoutEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import { Spinner, IndexPath, Layout, Select, SelectItem } from '@ui-kitten/components'

import { AppHeadericon } from '../components/AppHeaderIcon';
import { PostList } from '../components/PostList'
import { fetchNotes, setFilter } from '../store/notes/actions'
import { getNotes } from '../store/notes/selectors'
import { IconAntDesign, getIconAntDesign } from '../components/UI/IconAntDesign'

const filterList = [
  { title: 'Сначала новые', value: 'datea' },
  { title: 'Сначала старые', value: 'dated' },
  { title: 'Имя по возратсанию', value: 'namea' },
  { title: 'Имя по убыванию', value: 'named' },
]

export const Mainscreen = function ({ navigation, route }) {
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const dispatch = useDispatch()
  const notes = useSelector(getNotes)
  const isLoading = useSelector(state => state.notes.loading)

  // подстановка кнопок в шапку
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <AppHeadericon pressHandle={e => {
          navigation.toggleDrawer()
        }}>
          <AntDesign size={24} color="#fff" name="menufold" />
        </AppHeadericon>
      ),
      headerRight: () => (
        <AppHeadericon pressHandle={e => navigation.navigate('create')}>
          <AntDesign size={24} color="#fff" name="plus" />
        </AppHeadericon>
      ),
    });
  }, [])

  // подгрузка записей из базы
  useEffect(() => {
    dispatch(fetchNotes())
  }, [])

  // обработка выбора фильтра
  const handleSelect = (index) => {
    setSelectedIndex(index)
    dispatch(setFilter(filterList[index.row].value))
  }
  
  // навигация к записи
  const openPostHanlder = useCallback((post) => {
    navigation.navigate('post', {
      postId: post.id
    })
  }, [navigation])

  if (isLoading) return <View style={styles.center}><Spinner /></View>

  if (notes.length == 0) return <Text style={styles.nothingText}>Пока ничего нет...</Text>

  return (
    <View style={{ flex: 1 }}>
      <Layout style={styles.container} level='1'>
        <Select
          style={styles.select}
          value={filterList[selectedIndex.row].title}
          selectedIndex={selectedIndex}
          onSelect={handleSelect}>
          <SelectItem accessoryLeft={getIconAntDesign(20, 'calendar')} title='Сначала новые' />
          <SelectItem accessoryLeft={getIconAntDesign(20, 'table')} title='Сначала старые' />
          <SelectItem accessoryLeft={getIconAntDesign(20, 'up-square-o')} title='Имя по возратсанию' />
          <SelectItem accessoryLeft={getIconAntDesign(20, 'down-square-o')} title='Имя по убыванию' />
        </Select>
      </Layout>

      <PostList data={notes} openPostHanlder={openPostHanlder} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 5
  },
  nothingText: {
    padding: 15,
    textAlign: 'center'
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "center"
  },
  container: {
    marginVertical: 10
  },
  select: {
    marginHorizontal: 5
  }
})