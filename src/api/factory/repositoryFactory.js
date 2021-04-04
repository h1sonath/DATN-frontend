import companyRepository from "@/api/repository/companyRepository"
import projectRegistrationRepository from "@/api/repository/projectRegistrationRepository"
import projectRepository from "@/api/repository/projectRepository"
import topicRepository from "@/api/repository/topicRepository"
import teacherRepository from "@/api/repository/teacherRepository"
import studentRepository from "@/api/repository/studentRepository"
import accountRepository from "@/api/repository/accountRepository"
import programRepository from "../repository/programRepository"
import documentRepository from "../repository/documentRepository"
const repositories = {
  account: accountRepository,
  company: companyRepository,
  document: documentRepository,
  projectRegistration: projectRegistrationRepository,
  project: projectRepository,
  topic: topicRepository,
  teacher: teacherRepository,
  student: studentRepository,
  program: programRepository
}

export const RepositoryFactory = {
  get: name => repositories[name]
}
