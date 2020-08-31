import { getreepoch, getredoc, getrelabel, getAnnotators, labelconfirm } from '@/api/reviewer'

const state = {
  reviewerid: '',
  epochid: '',
  annotator_id: '',
  docid: ''
}

const mutations = {
  SET_reviewerid: (state, reviewerid) => {
    state.reviewerid = reviewerid
  },
  SET_epochid: (state, epochid) => {
    state.epochid = epochid
  },
  SET_annotator_id: (state, annotator_id) => {
    state.annotator_id = annotator_id
  },
  SET_docid: (state, docid) => {
    state.docid = docid
  }
}

const actions = {
  getreepoch({ commit, state }, id) {
    const reviewerid = id
    return new Promise((resolve, reject) => {
      getreepoch(reviewerid).then(response => {
        // console.log(response)
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getredoc({ commit, state }, id) {
    const epochid = id
    return new Promise((resolve, reject) => {
      getredoc(epochid).then(response => {
        // console.log(response)
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getrelabel({ commit, state }, list) {
    const docid = list.docid
    const userid = list.userid
    return new Promise((resolve, reject) => {
      getrelabel(docid, userid).then(response => {
        // console.log(response)
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getAnnotators({ commit, state }, list) {
    const docid = list.docid
    return new Promise((resolve, reject) => {
      getAnnotators(docid).then(response => {
        // console.log(response)
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  labelconfirm({ commit }, data) {
    // console.log(212)
    const id = data.id
    const list = data.list
    return new Promise((resolve, reject) => {
      labelconfirm(id, list).then(response => {
        console.log(response)
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
